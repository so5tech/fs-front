"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../../../models/user"));
const generatejwt_1 = __importDefault(require("../../../helpers/authentication/generatejwt"));
const errorcode_1 = require("../../../type/errorcode");
const http_status_codes_1 = require("http-status-codes");
const LoginController = async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        const user = await user_1.default.findOne({ email: email, password: password });
        if (!user)
            throw new Error(errorcode_1.ErrorCode.UNAUTHORIZED);
        const bearerToken = {
            _id: user._id,
            email: user.email,
            role: user.role,
        };
        const token = (0, generatejwt_1.default)(bearerToken);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            data: { 'btoken': bearerToken, "user": user },
            status_code: http_status_codes_1.StatusCodes.OK
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.default = LoginController;
//# sourceMappingURL=login.js.map