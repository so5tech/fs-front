import mongoose, {Model, Schema } from "mongoose";
// import Department from ".departement";

type UsageStatisticsDocument = mongoose.Document & {
    user_name: string;
    email_id: string;
    department: string;
    data: Date;
    logs: object[];
};

const UsageStatisticsSchema = new mongoose.Schema({
    user_name: {type: String},
    email_id: {type: String},
    department: {type: String},
    comment: {type: String},
    date: Date,
    logs: [{api: {type: String}, time: {type: Date}}],
});

export interface IUsageStatisticsModel extends Model<UsageStatisticsDocument> { 

}

const UsageStatistics = mongoose.model<UsageStatisticsDocument, IUsageStatisticsModel>("UsageStatistics", UsageStatisticsSchema);

export default UsageStatistics;