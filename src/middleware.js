/// koajs middleware 

const nacl = require('tweetnacl');
const crypto = require('crypto');
const bs58 = require('bs58');

import { near } from './index';

export const VALID_BLOCK_AGE = 100;

export const validBlock = async (blockNumber) => {
	const currentBlock = (await connection.provider.status()).sync_info.latest_block_height;
	const givenBlock = Number(blockNumber);

	if (givenBlock <= currentBlock - VALID_BLOCK_AGE || givenBlock > currentBlock) {
		return false;
	}
	return true;
};

export const verifySignature = async (accountId, data, signature, contractId = '') => {
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

export const hasAccessKey = async (ctx, next) => {
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

	ctx.accountId = accountId;
	ctx.networkId = process.env.NETWORK_ID;

	return await next();
};

export const withNear = async (ctx, next) => {
	ctx.near = near;
	await next();
};