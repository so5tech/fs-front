"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../../../models/user"));
const mongoose_1 = require("mongoose");
const http_status_codes_1 = require("http-status-codes");
const SoftDeleteController = async (req, res) => {
    try {
        const user_id = new mongoose_1.Types.ObjectId(req.params.id);
        req.body['is_delete'] = req.params.type == 'softDelete' ? true : false;
        const updatedUser = await user_1.default.updateOne({ _id: user_id }, { is_delete: req.body.is_delete });
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            success: true,
            status_code: "User Updated",
            message: `User Updated successfully ${updatedUser}`,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.default = SoftDeleteController;
//# sourceMappingURL=softDelete.js.map