import { ExtendedRequest, ExtendedResponse } from "../../../type/types";
import User from "../../../models/user";

import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';

const GetController = async (
    req : ExtendedRequest,
    res : ExtendedResponse    
): Promise<void> => {
    try {
        // const { email, password } = req.body
        const Users = await User.find({});
        res.status(StatusCodes.OK).json({
            success: true,
            status_code: StatusCodes.OK,
            data: Users,
            message: "All Users Data",
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export default GetController;