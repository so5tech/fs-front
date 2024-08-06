import jwt from "jsonwebtoken";
const secret: string = process.env.AUTH_SECRET;
import { ExtendedResponse } from "../../type/types";
import {ErrorCode} from "../../type/errorcode";

type verificationRespose = {
  valid: boolean;
  decoded: any;
};

const verifyJWT = (
  jsontoken: string,
  res: ExtendedResponse
): Promise<verificationRespose> => {
  return new Promise((resolve) => {
    jwt.verify(jsontoken, secret, (err, decoded) => {
      if (err) {
        switch (err.name) {
          case "TokenExpiredError":
            if (res) res.sendErrorMessage(ErrorCode.TOKEN_EXPIRED);
            break;
          case "JsonWebTokenError":
            if (res) res.sendErrorMessage(ErrorCode.INVALID_TOKEN);
            break;
          default:
            if (res) res.sendErrorMessage(ErrorCode.INVALID_TOKEN);
            resolve({ valid: false, decoded });
        }
      } else {
        resolve({ valid: true, decoded });
      }
    });
  });
};

export default verifyJWT;
