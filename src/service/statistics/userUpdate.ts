import UsageStatistics from '../../models/usageStatistics';
import User from '../../models/user';


export const userUpdate = async (data) => {
    if (data) {
        const result = await User.findOne({ email: data.email });
        if (result) {
            let log_data = []
            let log = { "api": data.request.originalUrl, "time": new Date() }
            let date = new Date();
            let full_date = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2);

            const statistic_result = await UsageStatistics.findOne({ email_id: data.email_id, data: new Date(full_date) });
            if (statistic_result) {
                let logs_data = statistic_result.logs
                logs_data.push(log)
                await UsageStatistics.updateOne({ _id: statistic_result._id }, { $set: { logs: logs_data } })
            } else {
                log_data.push(log)
                const usageStatistics = new UsageStatistics({
                    user_name: result.name,
                    email_id: data.email_id,
                    date: new Date(full_date),
                    logs: log_data
                });
                await usageStatistics.save();
            }
            if( data.request.originalUrl === '/bo/api/auth/validateUser'){
                const statistic_results = await UsageStatistics.find({ email_id: data.email_id, date: new Date(full_date) });
                for (let sr of statistic_results){
                    let sr_log = sr.logs;
                    if(sr_log.length === 1){
                        const delete_result = await UsageStatistics.deleteOne({ _id: sr._id });
                    }
                }
            }
        }
    }
}
