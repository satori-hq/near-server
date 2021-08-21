/// for interacting with nft-series contract
/// https://github.com/near-apps/nft-series
const path = require('path');

import { viewAccount } from './index';

export const getType = async (contractId, token_type_title) => {
	try {
		return await viewAccount.viewFunction(contractId, 'nft_get_type', { token_type_title });
	} catch (e) {
		console.warn('error getType', e);
		return null;
	}
};

export const getTypeSupply = async (contractId, token_type_title) => {
	try {
		return await viewAccount.viewFunction(contractId, 'nft_supply_for_type', { token_type_title });
	} catch (e) {
		console.warn('error getTypeSupply', e);
		return 0;
	}
};

export const nftContractPath = path.join(__dirname, process.env.NFT_CONTRACT_PATH || '../../../out/main.wasm');