"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdate = void 0;
const usageStatistics_1 = __importDefault(require("../../models/usageStatistics"));
const user_1 = __importDefault(require("../../models/user"));
const userUpdate = async (data) => {
    if (data) {
        const result = await user_1.default.findOne({ email: data.email });
        if (result) {
            let log_data = [];
            let log = { "api": data.request.originalUrl, "time": new Date() };
            let date = new Date();
            let full_date = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2);
            const statistic_result = await usageStatistics_1.default.findOne({ email_id: data.email_id, data: new Date(full_date) });
            if (statistic_result) {
                let logs_data = statistic_result.logs;
                logs_data.push(log);
                await usageStatistics_1.default.updateOne({ _id: statistic_result._id }, { $set: { logs: logs_data } });
            }
            else {
                log_data.push(log);
                const usageStatistics = new usageStatistics_1.default({
                    user_name: result.name,
                    email_id: data.email_id,
                    date: new Date(full_date),
                    logs: log_data
                });
                await usageStatistics.save();
            }
            if (data.request.originalUrl === '/bo/api/auth/validateUser') {
                const statistic_results = await usageStatistics_1.default.find({ email_id: data.email_id, date: new Date(full_date) });
                for (let sr of statistic_results) {
                    let sr_log = sr.logs;
                    if (sr_log.length === 1) {
                        const delete_result = await usageStatistics_1.default.deleteOne({ _id: sr._id });
                    }
                }
            }
        }
    }
};
exports.userUpdate = userUpdate;
//# sourceMappingURL=userUpdate.js.map