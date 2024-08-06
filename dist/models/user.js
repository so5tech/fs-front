"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String },
    is_delete: { type: Boolean, default: false }
}, { timestamps: { createdAt: "created_on", updatedAt: "updated_on" } });
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
//# sourceMappingURL=user.js.map