import { NextFunction } from "express";
import { ExtendedRequest, ExtendedResponse } from "../type/types";
import { ErrorCode } from "../type/errorcode";
import verifyToken from "../helpers/authentication/verifyjwt";

import { userUpdate } from "../service/statistics/userUpdate";

import User from "../models/user";


const TokenAuth = () : any => {
    const Auth = async (req: ExtendedRequest, res: ExtendedResponse, next: NextFunction): Promise<void> => {
        const jsontoken = req.headers.authorization.split(" ")[1];
        const validateToken = await verifyToken(jsontoken, res);

        req.admin = validateToken.decoded;
        req.body = (req.body);
        if(validateToken.valid){
            try {
                const admin = await User.find({"email": req.admin.email});
                if(!admin) throw new Error(ErrorCode.ACCESS_DENIED);
                let data = {
                    email_id: req.admin.email,
                    request: req
                }
                userUpdate(data);

                next();
            } catch (err) {
                res.sendErrorMessage(err.message);
            }
        }
    };
    return Auth;
}

export default TokenAuth;