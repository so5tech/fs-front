import { ExtendedRequest, ExtendedResponse } from "../../../type/types";
import User from "../../../models/user";
import { Types } from "mongoose";

import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';

const SoftDeleteController = async (
    req : ExtendedRequest,
    res : ExtendedResponse    
): Promise<void> => {
    try {
        const user_id = new Types.ObjectId(req.params.id);

        req.body['is_delete'] = req.params.type == 'softDelete' ? true : false; 
        const updatedUser = await User.updateOne({_id: user_id}, {is_delete: req.body.is_delete})
        res.status(StatusCodes.CREATED).json({
            success: true,
            status_code: "User Updated",
            message: `User Updated successfully ${updatedUser}`,
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export default SoftDeleteController;