"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// const secret:string = process.env.AUTH_SECRET;
const secret = "1234";
const generateJWT = (payload) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, secret, {
            // expiresIn: Number(process.env.BEARER_TOKEN_VALIDITY)
            expiresIn: Number(604800)
        }, (err, token) => {
            if (!err)
                resolve(token);
            else
                reject(err);
        });
    });
};
exports.default = generateJWT;
//# sourceMappingURL=generatejwt.js.map