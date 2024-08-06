import User from "../../../models/user";
import generateJWT from "../../../helpers/authentication/generatejwt";

import { ExtendedRequest, ExtendedResponse } from "../../../type/types";
import {ErrorCode} from "../../../type/errorcode";

import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';

const LoginController = async (
    req : ExtendedRequest,
    res : ExtendedResponse    
): Promise<void> => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        const user = await User.findOne({email:email, password:password});
        if(!user) throw new Error(ErrorCode.UNAUTHORIZED);
        const bearerToken = {
            _id: user._id,            
            email: user.email,
            role: user.role,
        }
        const token = generateJWT(bearerToken);
        res.status(StatusCodes.OK).json({
            success: true,
            data: {'btoken': bearerToken, "user": user},
            status_code: StatusCodes.OK
            
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export default LoginController;