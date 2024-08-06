"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UsageStatisticsSchema = new mongoose_1.default.Schema({
    user_name: { type: String },
    email_id: { type: String },
    department: { type: String },
    comment: { type: String },
    date: Date,
    logs: [{ api: { type: String }, time: { type: Date } }],
});
const UsageStatistics = mongoose_1.default.model("UsageStatistics", UsageStatisticsSchema);
exports.default = UsageStatistics;
//# sourceMappingURL=usageStatistics.js.map