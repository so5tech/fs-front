import { ExtendedRequest, ExtendedResponse } from "../../../type/types";
import User from "../../../models/user";

import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';

const PostController = async (
    req : ExtendedRequest,
    res : ExtendedResponse    
): Promise<void> => {
    try {
        // const { email, password } = req.body
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        console.log(savedUser, req.body);
        res.status(StatusCodes.CREATED).json({
            success: true,
            status_code: StatusCodes.CREATED,
            message: `User created successfully ${savedUser}`,
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export default PostController;