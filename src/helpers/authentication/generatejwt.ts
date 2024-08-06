/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import jwt from "jsonwebtoken";
// const secret:string = process.env.AUTH_SECRET;
const secret:string = "1234";

const generateJWT = (payload: any) => {
	return new Promise((resolve, reject) => {
		jwt.sign(payload, secret, {
			// expiresIn: Number(process.env.BEARER_TOKEN_VALIDITY)
            expiresIn: Number(604800)

		},
		(err, token: string) => {
			if(!err) resolve(token);
			else reject(err);
		});
	});
};

export default generateJWT;