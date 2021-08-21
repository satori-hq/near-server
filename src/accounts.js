
import {
	near, keyStore, networkId,
	contractAccount,
	NEW_ACCOUNT_AMOUNT, FUNDING_ACCOUNT_PRIVATE_KEY,
} from './index';

export const createAccount = (accountId, publicKey) => contractAccount.functionCall({
	contractId: networkId,
	methodName: 'create_account',
	args: {
		new_account_id: accountId,
		new_public_key: publicKey,
	},
	gas: GAS,
	attachedDeposit: NEW_ACCOUNT_AMOUNT
});

export const getClientAccount = async (accountId) => {
	keyStore.setKey(
		networkId,
		accountId,
		KeyPair.fromString(FUNDING_ACCOUNT_PRIVATE_KEY)
	);
	const account = new nearAPI.Account(near.connection, accountId);
	try {
		const state = await account.state();
		const hasContract = state.code_hash !== DEFAULT_CODE_HASH;
		return { exists: true, state, hasContract, account };
	} catch (e) {
		if (!/does not exist/.test(e.toString())) {
			throw e;
		}
	}
	return { taken: false, account };
};