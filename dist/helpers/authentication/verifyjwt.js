"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.AUTH_SECRET;
const errorcode_1 = require("../../type/errorcode");
const verifyJWT = (jsontoken, res) => {
    return new Promise((resolve) => {
        jsonwebtoken_1.default.verify(jsontoken, secret, (err, decoded) => {
            if (err) {
                switch (err.name) {
                    case "TokenExpiredError":
                        if (res)
                            res.sendErrorMessage(errorcode_1.ErrorCode.TOKEN_EXPIRED);
                        break;
                    case "JsonWebTokenError":
                        if (res)
                            res.sendErrorMessage(errorcode_1.ErrorCode.INVALID_TOKEN);
                        break;
                    default:
                        if (res)
                            res.sendErrorMessage(errorcode_1.ErrorCode.INVALID_TOKEN);
                        resolve({ valid: false, decoded });
                }
            }
            else {
                resolve({ valid: true, decoded });
            }
        });
    });
};
exports.default = verifyJWT;
//# sourceMappingURL=verifyjwt.js.map