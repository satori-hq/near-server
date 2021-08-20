const fs = require('fs');
const path = require('path');
const nearAPI = require('near-api-js');
const nacl = require('tweetnacl');
const crypto = require('crypto');
const bs58 = require('bs58');
const getConfig = require('../../config');
const {
	REACT_APP_FUNDING_ACCOUNT, NETWORK_ID, REACT_APP_APP_ROUTE,
	FUNDING_ACCOUNT_PUBLIC_KEY, FUNDING_ACCOUNT_PRIVATE_KEY,
} = process.env;
const networkId = NETWORK_ID;
const { nodeUrl, walletUrl, explorerUrl, linkdropContractId } = getConfig(networkId);

const {
	keyStores: { InMemoryKeyStore },
	Near,
	Account,
	KeyPair,
	utils: { format: { parseNearAmount } },
} = nearAPI;

const keyStore = new InMemoryKeyStore();
keyStore.setKey(
	networkId,
	REACT_APP_FUNDING_ACCOUNT,
	KeyPair.fromString(FUNDING_ACCOUNT_PRIVATE_KEY)
);
const near = new Near({
	networkId,
	nodeUrl,
	deps: { keyStore },
});
const { connection } = near;

const viewAccount = new Account(connection, networkId);

/// middleware 

const VALID_BLOCK_AGE = 100;

const validBlock = async (blockNumber) => {
	const currentBlock = (await connection.provider.status()).sync_info.latest_block_height;
	const givenBlock = Number(blockNumber);

	if (givenBlock <= currentBlock - VALID_BLOCK_AGE || givenBlock > currentBlock) {
		return false;
	}
	return true;
};

const createAccount = (accountId, publicKey) => contractAccount.functionCall({
	contractId: networkId,
	methodName: 'create_account',
	args: {
		new_account_id: accountId,
		new_public_key: publicKey,
	},
	gas: GAS,
	attachedDeposit: NEW_ACCOUNT_AMOUNT
})

const verifySignature = async (accountId, data, signature, contractId = '') => {
	const nearAccount = await near.account(accountId);
	try {
		const hash = crypto.createHash('sha256').update(data).digest();
		let accessKeys = await nearAccount.getAccessKeys();
		if (contractId.length) {
			accessKeys = accessKeys.filter(({ access_key: { permission }}) => permission && permission.FunctionCall && permission.FunctionCall.receiver_id === contractId);
		} else {
			accessKeys = accessKeys.filter(({ access_key: { permission }}) => permission === 'FullAccess');
		}
		return accessKeys.some(({ public_key }) => {
			const publicKey = public_key.replace('ed25519:', '');
			return nacl.sign.detached.verify(hash, Buffer.from(signature, 'base64'), bs58.decode(publicKey));
		});
	} catch (e) {
		console.error(e);
		return false;
	}
};

const hasAccessKey = async (ctx, next) => {
	const { accountId, contractId, blockNumber, blockNumberSignature } = ctx.request.body;
    
	if (!accountId || !contractId || !blockNumber || !blockNumberSignature) {
		ctx.throw(403, 'You must provide an accountId, contractId, blockNumber, and blockNumberSignature');
	}
	
	if (!(await validBlock(blockNumber))) {
		ctx.throw(403, `You must provide a blockNumber within ${VALID_BLOCK_AGE} of the most recent block; provided: ${blockNumber}`);
	}

	if (!(await verifySignature(accountId, blockNumber, blockNumberSignature, contractId))) {
		ctx.throw(403, `blockNumberSignature did not match a signature of blockNumber=${blockNumber} from accountId=${accountId}`);
	}

	ctx.accountId = accountId
	ctx.networkId = process.env.NETWORK_ID

	return await next();
};

const getType = async (contractId, token_type_title) => {
	try {
		return await viewAccount.viewFunction(contractId, 'nft_get_type', { token_type_title });
	} catch (e) {
		console.warn('error getType', e);
		return null;
	}
};

const getTypeSupply = async (contractId, token_type_title) => {
	try {
		return await viewAccount.viewFunction(contractId, 'nft_supply_for_type', { token_type_title });
	} catch (e) {
		console.warn('error getTypeSupply', e);
		return 0;
	}
};

const getClientAccount = async (accountId) => {
	keyStore.setKey(
		networkId,
		accountId,
		KeyPair.fromString(FUNDING_ACCOUNT_PRIVATE_KEY)
	);
	const account = new nearAPI.Account(near.connection, accountId);
	try {
		const state = await account.state();
		const hasContract = state.code_hash !== '11111111111111111111111111111111';
		return { exists: true, state, hasContract, account };
	} catch (e) {
		if (!/does not exist/.test(e.toString())) {
			throw e;
		}
	}
	return { taken: false, account };
};

const contractPath = path.join(__dirname, '../../../out/main.wasm');

const withNear = async (ctx, next) => {
	ctx.near = near;
	await next();
};

module.exports = {
	withNear,
	hasAccessKey,
	createAccount,

	near,
	keyStore,
	connection,

	networkId,
	fundingAccount: new Account(connection, REACT_APP_FUNDING_ACCOUNT),
	fundingAccountId: REACT_APP_FUNDING_ACCOUNT,
	accountSuffix: '.' + REACT_APP_FUNDING_ACCOUNT,
	publicKey: FUNDING_ACCOUNT_PUBLIC_KEY,
	walletUrl,
	explorerUrl,
	redirectUrl: REACT_APP_APP_ROUTE,
	newAccountAmount: parseNearAmount('1'),
	newContractAmount: parseNearAmount('5'),

	getType,
	getTypeSupply,
	getClientAccount,

	linkdrop: {
		contractId: linkdropContractId,
		getKey: () => KeyPair.fromRandom('ed25519'),
		gas: '50000000000000',
		attachedDeposit: parseNearAmount('0.02'),
	},

	nft: {
		contractBytes: fs.readFileSync(contractPath),
		gas: '50000000000000',
		attachedDeposit: parseNearAmount('0.02'),
	}
};
