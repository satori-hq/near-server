
/// TODO clean up these deps
const {
	REACT_APP_FUNDING_ACCOUNT, NETWORK_ID, REACT_APP_APP_ROUTE,
	FUNDING_ACCOUNT_PUBLIC_KEY, FUNDING_ACCOUNT_PRIVATE_KEY,
	CONFIG_PATH,
} = process.env;

const fs = require('fs');
const nearAPI = require('near-api-js');
const getConfig = require(CONFIG_PATH);

import { getType, getTypeSupply, nftContractPath } from './nft';
import { createAccount, getClientAccount } from './accounts';
import { validBlock, verifySignature, hasAccessKey, withNear } from './middleware';

const networkId = NETWORK_ID;
const { nodeUrl, walletUrl, explorerUrl, linkdropContractId } = getConfig(networkId);
const {
	keyStores: { InMemoryKeyStore },
	Near,
	Account,
	KeyPair,
	utils: { format: { parseNearAmount } },
} = nearAPI;

/// create the server's main funding account
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
const contractAccount = new Account(connection, REACT_APP_FUNDING_ACCOUNT)

module.exports = {
	near,
	keyStore,
	connection,

	/// middleware
	withNear,
	hasAccessKey,
	validBlock, verifySignature,

	createAccount,
	viewAccount: contractAccount,

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
		// contractBytes: fs.readFileSync(nftContractPath),
		gas: '50000000000000',
		attachedDeposit: parseNearAmount('0.02'),
	},

	REACT_APP_FUNDING_ACCOUNT, NETWORK_ID, REACT_APP_APP_ROUTE,
	FUNDING_ACCOUNT_PUBLIC_KEY, FUNDING_ACCOUNT_PRIVATE_KEY,

	DEFAULT_CODE_HASH: '11111111111111111111111111111111',
};
