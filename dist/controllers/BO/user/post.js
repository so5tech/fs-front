"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../../../models/user"));
const http_status_codes_1 = require("http-status-codes");
const PostController = async (req, res) => {
    try {
        // const { email, password } = req.body
        const newUser = new user_1.default(req.body);
        const savedUser = await newUser.save();
        console.log(savedUser, req.body);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            success: true,
            status_code: http_status_codes_1.StatusCodes.CREATED,
            message: `User created successfully ${savedUser}`,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.default = PostController;
//# sourceMappingURL=post.js.map