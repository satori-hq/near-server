require("fs");
var $hddzT$nearapijs = require("near-api-js");
var $hddzT$path = require("path");
var $hddzT$tweetnacl = require("tweetnacl");
var $hddzT$crypto = require("crypto");
var $hddzT$bs58 = require("bs58");

"use strict";
var $824752acbb479dfe$exports = {};
"use strict";
Object.defineProperty($824752acbb479dfe$exports, "__esModule", {
    value: true
});
$824752acbb479dfe$exports.nftContractPath = $824752acbb479dfe$exports.getTypeSupply = $824752acbb479dfe$exports.getType = void 0;

function $824752acbb479dfe$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) resolve(value);
    else Promise.resolve(value).then(_next, _throw);
}
function $824752acbb479dfe$var$_asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                $824752acbb479dfe$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                $824752acbb479dfe$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}

var $824752acbb479dfe$var$getType = /*#__PURE__*/ function() {
    var _ref = $824752acbb479dfe$var$_asyncToGenerator(/*#__PURE__*/ regeneratorRuntime.mark(function _callee(contractId, token_type_title) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while(true)switch(_context.prev = _context.next){
                case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return $bc0f9b839bf0e25b$exports.viewAccount.viewFunction(contractId, 'nft_get_type', {
                        token_type_title: token_type_title
                    });
                case 3:
                    return _context.abrupt("return", _context.sent);
                case 6:
                    _context.prev = 6;
                    _context.t0 = _context["catch"](0);
                    console.warn('error getType', _context.t0);
                    return _context.abrupt("return", null);
                case 10:
                case "end":
                    return _context.stop();
            }
        }, _callee, null, [
            [
                0,
                6
            ]
        ]);
    }));
    return function getType(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();
$824752acbb479dfe$exports.getType = $824752acbb479dfe$var$getType;
var $824752acbb479dfe$var$getTypeSupply = /*#__PURE__*/ function() {
    var _ref2 = $824752acbb479dfe$var$_asyncToGenerator(/*#__PURE__*/ regeneratorRuntime.mark(function _callee2(contractId, token_type_title) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while(true)switch(_context2.prev = _context2.next){
                case 0:
                    _context2.prev = 0;
                    _context2.next = 3;
                    return $bc0f9b839bf0e25b$exports.viewAccount.viewFunction(contractId, 'nft_supply_for_type', {
                        token_type_title: token_type_title
                    });
                case 3:
                    return _context2.abrupt("return", _context2.sent);
                case 6:
                    _context2.prev = 6;
                    _context2.t0 = _context2["catch"](0);
                    console.warn('error getTypeSupply', _context2.t0);
                    return _context2.abrupt("return", 0);
                case 10:
                case "end":
                    return _context2.stop();
            }
        }, _callee2, null, [
            [
                0,
                6
            ]
        ]);
    }));
    return function getTypeSupply(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();
$824752acbb479dfe$exports.getTypeSupply = $824752acbb479dfe$var$getTypeSupply;
var $824752acbb479dfe$var$nftContractPath = $hddzT$path.join(__dirname, process.env.NFT_CONTRACT_PATH || '../../../out/main.wasm');
$824752acbb479dfe$exports.nftContractPath = $824752acbb479dfe$var$nftContractPath;


var $9a497783e28fb8d8$exports = {};
"use strict";
Object.defineProperty($9a497783e28fb8d8$exports, "__esModule", {
    value: true
});
$9a497783e28fb8d8$exports.getClientAccount = $9a497783e28fb8d8$exports.createAccount = void 0;

function $9a497783e28fb8d8$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) resolve(value);
    else Promise.resolve(value).then(_next, _throw);
}
function $9a497783e28fb8d8$var$_asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                $9a497783e28fb8d8$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                $9a497783e28fb8d8$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
var $9a497783e28fb8d8$var$createAccount = function createAccount(accountId, publicKey) {
    return $bc0f9b839bf0e25b$exports.contractAccount.functionCall({
        contractId: $bc0f9b839bf0e25b$exports.networkId,
        methodName: 'create_account',
        args: {
            new_account_id: accountId,
            new_public_key: publicKey
        },
        gas: GAS,
        attachedDeposit: $bc0f9b839bf0e25b$exports.NEW_ACCOUNT_AMOUNT
    });
};
$9a497783e28fb8d8$exports.createAccount = $9a497783e28fb8d8$var$createAccount;
var $9a497783e28fb8d8$var$getClientAccount = /*#__PURE__*/ function() {
    var _ref = $9a497783e28fb8d8$var$_asyncToGenerator(/*#__PURE__*/ regeneratorRuntime.mark(function _callee(accountId) {
        var account, state, hasContract;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while(true)switch(_context.prev = _context.next){
                case 0:
                    $bc0f9b839bf0e25b$exports.keyStore.setKey($bc0f9b839bf0e25b$exports.networkId, accountId, KeyPair.fromString($bc0f9b839bf0e25b$exports.FUNDING_ACCOUNT_PRIVATE_KEY));
                    account = new nearAPI.Account($bc0f9b839bf0e25b$exports.near.connection, accountId);
                    _context.prev = 2;
                    _context.next = 5;
                    return account.state();
                case 5:
                    state = _context.sent;
                    hasContract = state.code_hash !== DEFAULT_CODE_HASH;
                    return _context.abrupt("return", {
                        exists: true,
                        state: state,
                        hasContract: hasContract,
                        account: account
                    });
                case 10:
                    _context.prev = 10;
                    _context.t0 = _context["catch"](2);
                    if (/does not exist/.test(_context.t0.toString())) {
                        _context.next = 14;
                        break;
                    }
                    throw _context.t0;
                case 14:
                    return _context.abrupt("return", {
                        taken: false,
                        account: account
                    });
                case 15:
                case "end":
                    return _context.stop();
            }
        }, _callee, null, [
            [
                2,
                10
            ]
        ]);
    }));
    return function getClientAccount(_x) {
        return _ref.apply(this, arguments);
    };
}();
$9a497783e28fb8d8$exports.getClientAccount = $9a497783e28fb8d8$var$getClientAccount;


var $31103f4e0182a5c8$exports = {};
"use strict";
Object.defineProperty($31103f4e0182a5c8$exports, "__esModule", {
    value: true
});
$31103f4e0182a5c8$exports.withNear = $31103f4e0182a5c8$exports.hasAccessKey = $31103f4e0182a5c8$exports.verifySignature = $31103f4e0182a5c8$exports.validBlock = $31103f4e0182a5c8$exports.VALID_BLOCK_AGE = void 0;

function $31103f4e0182a5c8$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) resolve(value);
    else Promise.resolve(value).then(_next, _throw);
}
function $31103f4e0182a5c8$var$_asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                $31103f4e0182a5c8$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                $31103f4e0182a5c8$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}



var $31103f4e0182a5c8$var$VALID_BLOCK_AGE = 100;
$31103f4e0182a5c8$exports.VALID_BLOCK_AGE = $31103f4e0182a5c8$var$VALID_BLOCK_AGE;
var $31103f4e0182a5c8$var$validBlock = /*#__PURE__*/ function() {
    var _ref = $31103f4e0182a5c8$var$_asyncToGenerator(/*#__PURE__*/ regeneratorRuntime.mark(function _callee(blockNumber) {
        var currentBlock, givenBlock;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while(true)switch(_context.prev = _context.next){
                case 0:
                    _context.next = 2;
                    return connection.provider.status();
                case 2:
                    currentBlock = _context.sent.sync_info.latest_block_height;
                    givenBlock = Number(blockNumber);
                    if (!(givenBlock <= currentBlock - $31103f4e0182a5c8$var$VALID_BLOCK_AGE || givenBlock > currentBlock)) {
                        _context.next = 6;
                        break;
                    }
                    return _context.abrupt("return", false);
                case 6:
                    return _context.abrupt("return", true);
                case 7:
                case "end":
                    return _context.stop();
            }
        }, _callee);
    }));
    return function validBlock(_x) {
        return _ref.apply(this, arguments);
    };
}();
$31103f4e0182a5c8$exports.validBlock = $31103f4e0182a5c8$var$validBlock;
var $31103f4e0182a5c8$var$verifySignature = /*#__PURE__*/ function() {
    var _ref2 = $31103f4e0182a5c8$var$_asyncToGenerator(/*#__PURE__*/ regeneratorRuntime.mark(function _callee2(accountId, data, signature) {
        var contractId, nearAccount, hash, accessKeys, _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while(true)switch(_context2.prev = _context2.next){
                case 0:
                    contractId = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : '';
                    _context2.next = 3;
                    return $bc0f9b839bf0e25b$exports.near.account(accountId);
                case 3:
                    nearAccount = _context2.sent;
                    _context2.prev = 4;
                    hash = $hddzT$crypto.createHash('sha256').update(data).digest();
                    _context2.next = 8;
                    return nearAccount.getAccessKeys();
                case 8:
                    accessKeys = _context2.sent;
                    if (contractId.length) accessKeys = accessKeys.filter(function(_ref3) {
                        var permission = _ref3.access_key.permission;
                        return permission && permission.FunctionCall && permission.FunctionCall.receiver_id === contractId;
                    });
                    else accessKeys = accessKeys.filter(function(_ref4) {
                        var permission = _ref4.access_key.permission;
                        return permission === 'FullAccess';
                    });
                    return _context2.abrupt("return", accessKeys.some(function(_ref5) {
                        var public_key = _ref5.public_key;
                        var publicKey = public_key.replace('ed25519:', '');
                        return $hddzT$tweetnacl.sign.detached.verify(hash, Buffer.from(signature, 'base64'), $hddzT$bs58.decode(publicKey));
                    }));
                case 13:
                    _context2.prev = 13;
                    _context2.t0 = _context2["catch"](4);
                    console.error(_context2.t0);
                    return _context2.abrupt("return", false);
                case 17:
                case "end":
                    return _context2.stop();
            }
        }, _callee2, null, [
            [
                4,
                13
            ]
        ]);
    }));
    return function verifySignature(_x2, _x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();
$31103f4e0182a5c8$exports.verifySignature = $31103f4e0182a5c8$var$verifySignature;
var $31103f4e0182a5c8$var$hasAccessKey = /*#__PURE__*/ function() {
    var _ref6 = $31103f4e0182a5c8$var$_asyncToGenerator(/*#__PURE__*/ regeneratorRuntime.mark(function _callee3(ctx, next) {
        var _ctx$request$body, accountId, contractId, blockNumber, blockNumberSignature;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while(true)switch(_context3.prev = _context3.next){
                case 0:
                    _ctx$request$body = ctx.request.body, accountId = _ctx$request$body.accountId, contractId = _ctx$request$body.contractId, blockNumber = _ctx$request$body.blockNumber, blockNumberSignature = _ctx$request$body.blockNumberSignature;
                    if (!accountId || !contractId || !blockNumber || !blockNumberSignature) ctx["throw"](403, 'You must provide an accountId, contractId, blockNumber, and blockNumberSignature');
                    _context3.next = 4;
                    return $31103f4e0182a5c8$var$validBlock(blockNumber);
                case 4:
                    if (_context3.sent) {
                        _context3.next = 6;
                        break;
                    }
                    ctx["throw"](403, "You must provide a blockNumber within ".concat($31103f4e0182a5c8$var$VALID_BLOCK_AGE, " of the most recent block; provided: ").concat(blockNumber));
                case 6:
                    _context3.next = 8;
                    return $31103f4e0182a5c8$var$verifySignature(accountId, blockNumber, blockNumberSignature, contractId);
                case 8:
                    if (_context3.sent) {
                        _context3.next = 10;
                        break;
                    }
                    ctx["throw"](403, "blockNumberSignature did not match a signature of blockNumber=".concat(blockNumber, " from accountId=").concat(accountId));
                case 10:
                    ctx.accountId = accountId;
                    ctx.networkId = process.env.NETWORK_ID;
                    _context3.next = 14;
                    return next();
                case 14:
                    return _context3.abrupt("return", _context3.sent);
                case 15:
                case "end":
                    return _context3.stop();
            }
        }, _callee3);
    }));
    return function hasAccessKey(_x5, _x6) {
        return _ref6.apply(this, arguments);
    };
}();
$31103f4e0182a5c8$exports.hasAccessKey = $31103f4e0182a5c8$var$hasAccessKey;
var $31103f4e0182a5c8$var$withNear = /*#__PURE__*/ function() {
    var _ref7 = $31103f4e0182a5c8$var$_asyncToGenerator(/*#__PURE__*/ regeneratorRuntime.mark(function _callee4(ctx, next) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while(true)switch(_context4.prev = _context4.next){
                case 0:
                    ctx.near = $bc0f9b839bf0e25b$exports.near;
                    _context4.next = 3;
                    return next();
                case 3:
                case "end":
                    return _context4.stop();
            }
        }, _callee4);
    }));
    return function withNear(_x7, _x8) {
        return _ref7.apply(this, arguments);
    };
}();
$31103f4e0182a5c8$exports.withNear = $31103f4e0182a5c8$var$withNear;


/// TODO clean up these deps
var $bc0f9b839bf0e25b$var$_process$env = process.env, $bc0f9b839bf0e25b$var$REACT_APP_FUNDING_ACCOUNT = $bc0f9b839bf0e25b$var$_process$env.REACT_APP_FUNDING_ACCOUNT, $bc0f9b839bf0e25b$var$NETWORK_ID = $bc0f9b839bf0e25b$var$_process$env.NETWORK_ID, $bc0f9b839bf0e25b$var$REACT_APP_APP_ROUTE = $bc0f9b839bf0e25b$var$_process$env.REACT_APP_APP_ROUTE, $bc0f9b839bf0e25b$var$FUNDING_ACCOUNT_PUBLIC_KEY = $bc0f9b839bf0e25b$var$_process$env.FUNDING_ACCOUNT_PUBLIC_KEY, $bc0f9b839bf0e25b$var$FUNDING_ACCOUNT_PRIVATE_KEY = $bc0f9b839bf0e25b$var$_process$env.FUNDING_ACCOUNT_PRIVATE_KEY, $bc0f9b839bf0e25b$var$CONFIG_PATH = $bc0f9b839bf0e25b$var$_process$env.CONFIG_PATH;


var $bc0f9b839bf0e25b$var$getConfig = require($bc0f9b839bf0e25b$var$CONFIG_PATH);
var $bc0f9b839bf0e25b$var$networkId = $bc0f9b839bf0e25b$var$NETWORK_ID;
var $bc0f9b839bf0e25b$var$_getConfig = $bc0f9b839bf0e25b$var$getConfig($bc0f9b839bf0e25b$var$networkId), $bc0f9b839bf0e25b$var$nodeUrl = $bc0f9b839bf0e25b$var$_getConfig.nodeUrl, $bc0f9b839bf0e25b$var$walletUrl = $bc0f9b839bf0e25b$var$_getConfig.walletUrl, $bc0f9b839bf0e25b$var$explorerUrl = $bc0f9b839bf0e25b$var$_getConfig.explorerUrl, $bc0f9b839bf0e25b$var$linkdropContractId = $bc0f9b839bf0e25b$var$_getConfig.linkdropContractId;
var $bc0f9b839bf0e25b$var$InMemoryKeyStore = $hddzT$nearapijs.keyStores.InMemoryKeyStore, $bc0f9b839bf0e25b$var$Near = $hddzT$nearapijs.Near, $bc0f9b839bf0e25b$var$Account = $hddzT$nearapijs.Account, $bc0f9b839bf0e25b$var$KeyPair = $hddzT$nearapijs.KeyPair, $bc0f9b839bf0e25b$var$parseNearAmount = $hddzT$nearapijs.utils.format.parseNearAmount; /// create the server's main funding account
var $bc0f9b839bf0e25b$var$keyStore = new $bc0f9b839bf0e25b$var$InMemoryKeyStore();
$bc0f9b839bf0e25b$var$keyStore.setKey($bc0f9b839bf0e25b$var$networkId, $bc0f9b839bf0e25b$var$REACT_APP_FUNDING_ACCOUNT, $bc0f9b839bf0e25b$var$KeyPair.fromString($bc0f9b839bf0e25b$var$FUNDING_ACCOUNT_PRIVATE_KEY));
var $bc0f9b839bf0e25b$var$near = new $bc0f9b839bf0e25b$var$Near({
    networkId: $bc0f9b839bf0e25b$var$networkId,
    nodeUrl: $bc0f9b839bf0e25b$var$nodeUrl,
    deps: {
        keyStore: $bc0f9b839bf0e25b$var$keyStore
    }
});
var $bc0f9b839bf0e25b$var$connection = $bc0f9b839bf0e25b$var$near.connection;
var $bc0f9b839bf0e25b$var$contractAccount = new $bc0f9b839bf0e25b$var$Account($bc0f9b839bf0e25b$var$connection, $bc0f9b839bf0e25b$var$REACT_APP_FUNDING_ACCOUNT);
module.exports = {
    near: $bc0f9b839bf0e25b$var$near,
    keyStore: $bc0f9b839bf0e25b$var$keyStore,
    connection: $bc0f9b839bf0e25b$var$connection,
    /// middleware
    withNear: $31103f4e0182a5c8$exports.withNear,
    hasAccessKey: $31103f4e0182a5c8$exports.hasAccessKey,
    validBlock: $31103f4e0182a5c8$exports.validBlock,
    verifySignature: $31103f4e0182a5c8$exports.verifySignature,
    createAccount: $9a497783e28fb8d8$exports.createAccount,
    viewAccount: $bc0f9b839bf0e25b$var$contractAccount,
    networkId: $bc0f9b839bf0e25b$var$networkId,
    fundingAccount: new $bc0f9b839bf0e25b$var$Account($bc0f9b839bf0e25b$var$connection, $bc0f9b839bf0e25b$var$REACT_APP_FUNDING_ACCOUNT),
    fundingAccountId: $bc0f9b839bf0e25b$var$REACT_APP_FUNDING_ACCOUNT,
    accountSuffix: '.' + $bc0f9b839bf0e25b$var$REACT_APP_FUNDING_ACCOUNT,
    publicKey: $bc0f9b839bf0e25b$var$FUNDING_ACCOUNT_PUBLIC_KEY,
    walletUrl: $bc0f9b839bf0e25b$var$walletUrl,
    explorerUrl: $bc0f9b839bf0e25b$var$explorerUrl,
    redirectUrl: $bc0f9b839bf0e25b$var$REACT_APP_APP_ROUTE,
    newAccountAmount: $bc0f9b839bf0e25b$var$parseNearAmount('1'),
    newContractAmount: $bc0f9b839bf0e25b$var$parseNearAmount('5'),
    getType: $824752acbb479dfe$exports.getType,
    getTypeSupply: $824752acbb479dfe$exports.getTypeSupply,
    getClientAccount: $9a497783e28fb8d8$exports.getClientAccount,
    linkdrop: {
        contractId: $bc0f9b839bf0e25b$var$linkdropContractId,
        getKey: function getKey() {
            return $bc0f9b839bf0e25b$var$KeyPair.fromRandom('ed25519');
        },
        gas: '50000000000000',
        attachedDeposit: $bc0f9b839bf0e25b$var$parseNearAmount('0.02')
    },
    nft: {
        // contractBytes: fs.readFileSync(nftContractPath),
        gas: '50000000000000',
        attachedDeposit: $bc0f9b839bf0e25b$var$parseNearAmount('0.02')
    },
    REACT_APP_FUNDING_ACCOUNT: $bc0f9b839bf0e25b$var$REACT_APP_FUNDING_ACCOUNT,
    NETWORK_ID: $bc0f9b839bf0e25b$var$NETWORK_ID,
    REACT_APP_APP_ROUTE: $bc0f9b839bf0e25b$var$REACT_APP_APP_ROUTE,
    FUNDING_ACCOUNT_PUBLIC_KEY: $bc0f9b839bf0e25b$var$FUNDING_ACCOUNT_PUBLIC_KEY,
    FUNDING_ACCOUNT_PRIVATE_KEY: $bc0f9b839bf0e25b$var$FUNDING_ACCOUNT_PRIVATE_KEY,
    DEFAULT_CODE_HASH: '11111111111111111111111111111111'
};


//# sourceMappingURL=index.js.map
