"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorcode_1 = require("../type/errorcode");
const verifyjwt_1 = __importDefault(require("../helpers/authentication/verifyjwt"));
const userUpdate_1 = require("../service/statistics/userUpdate");
const user_1 = __importDefault(require("../models/user"));
const TokenAuth = () => {
    const Auth = async (req, res, next) => {
        const jsontoken = req.headers.authorization.split(" ")[1];
        const validateToken = await (0, verifyjwt_1.default)(jsontoken, res);
        req.admin = validateToken.decoded;
        req.body = (req.body);
        if (validateToken.valid) {
            try {
                const admin = await user_1.default.find({ "email": req.admin.email });
                if (!admin)
                    throw new Error(errorcode_1.ErrorCode.ACCESS_DENIED);
                let data = {
                    email_id: req.admin.email,
                    request: req
                };
                (0, userUpdate_1.userUpdate)(data);
                next();
            }
            catch (err) {
                res.sendErrorMessage(err.message);
            }
        }
    };
    return Auth;
};
exports.default = TokenAuth;
//# sourceMappingURL=authenticator.js.map