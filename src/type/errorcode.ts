import { ErrorResponse } from "./types";
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';


export enum ErrorCode {
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  TOKEN_EXPIRED = "TOKEN_EXPIRED",
  INVALID_TOKEN = "INVALID_TOKEN",
  INVALID_PASSWORD_FORMAT = "INVALID_PASSWORD_FORMAT",
  INVALID_EMAIL_FORMAT = "INVALID_EMAIL_FORMAT",
  EMAIL_EXIST = "EMAIL_EXIST",
  INVALID_EMAIL_PASSWORD = "INVALID_EMAIL_PASSWORD",
  ACCESS_DENIED = "ACCESS_DENIED",
  INVALID_OAUTH_TOKEN = "INVALID_OAUTH_TOKEN",
  PHONE_EXIST = "PHONE_EXIST",
  INVALID_USER = "INVALID_USER",
  INVALID_OTP = "INVALID_OTP",
  TIMEOUT_OTP = "TIMEOUT_OTP",
  EMAIL_NOT_EXIST = "EMAIL_NOT_EXIST",
  ACCOUNT_DEACTIVATED = "ACCOUNT_DEACTIVATED",
  PASSWORD_NOT_MATCH = "PASSWORD_NOT_MATCH",
  PHONE_NOT_EXIST = "PHONE_NOT_EXISTS",
  PASSWORD_MISMATCH = "PASSWORD_MISMATCH",
  
}

export enum ErrorCategory {
  AUTHENTICATION = "Authentication",

}

export const GetErrorMessage = (code: string): ErrorResponse => {
  switch (code) {

    case ErrorCode.TOKEN_EXPIRED:
      return {
        status_code: StatusCodes.UNAUTHORIZED,
        category: ErrorCategory.AUTHENTICATION,
        code: ErrorCode.TOKEN_EXPIRED,
        message: "Token expired",
        display_message: "Token expired",
      };
    case ErrorCode.INVALID_TOKEN:
      return {
        status_code: StatusCodes.UNAUTHORIZED,
        category: ErrorCategory.AUTHENTICATION,
        code: ErrorCode.INVALID_TOKEN,
        message: "Invalid Token",
        display_message: "Invalid Token",
      };
    case ErrorCode.INVALID_PASSWORD_FORMAT:
      return {
        status_code: StatusCodes.BAD_REQUEST,
        category: ErrorCategory.AUTHENTICATION,
        code: ErrorCode.INVALID_PASSWORD_FORMAT,
        message: "Invalid password format",
        display_message: "Invalid password format",
      };
    case ErrorCode.INVALID_EMAIL_FORMAT:
      return {
        status_code: StatusCodes.BAD_REQUEST,
        category: ErrorCategory.AUTHENTICATION,
        code: ErrorCode.INVALID_EMAIL_FORMAT,
        message: "Invalid email format",
        display_message: "Invalid email format",
      };
      case ErrorCode.EMAIL_EXIST:
        return {
          status_code: StatusCodes.BAD_REQUEST,
          category: ErrorCategory.AUTHENTICATION,
          code: ErrorCode.EMAIL_EXIST,
          message: "email exist",
          display_message: "email exist",
        };
      case ErrorCode.INVALID_EMAIL_PASSWORD:
        return {
          status_code: StatusCodes.BAD_REQUEST,
          category: ErrorCategory.AUTHENTICATION,
          code: ErrorCode.INVALID_EMAIL_PASSWORD,
          message: "Email Or Password Incorrect",
          display_message: "Email Or Password Incorrect",
        };
      case ErrorCode.ACCESS_DENIED:
        return {
          status_code: StatusCodes.UNAUTHORIZED,
          category: ErrorCategory.AUTHENTICATION,
          code: ErrorCode.ACCESS_DENIED,
          message: "Access denied",
          display_message: "Access denied",
        };
      case ErrorCode.INVALID_OAUTH_TOKEN:
        return {
          status_code: StatusCodes.UNAUTHORIZED,
          category: ErrorCategory.AUTHENTICATION,
          code: ErrorCode.INVALID_OAUTH_TOKEN,
          message: "Invalid Oauth token",
          display_message: "Invalid Oauth token",
        };
        case ErrorCode.PHONE_EXIST:
          return {
            status_code: StatusCodes.BAD_REQUEST,
            category: ErrorCategory.AUTHENTICATION,
            code: ErrorCode.PHONE_EXIST,
            message: "phone exist",
            display_message: "phone exist",
          };
        case ErrorCode.INVALID_USER:
          return {
            status_code: StatusCodes.BAD_REQUEST,
            category: ErrorCategory.AUTHENTICATION,
            code: ErrorCode.INVALID_USER,
            message: "Not a Valid User",
            display_message: "Not a Valid User",
          };
        case ErrorCode.INVALID_OTP:
          return {
            status_code: StatusCodes.BAD_REQUEST,
            category: ErrorCategory.AUTHENTICATION,
            code: ErrorCode.INVALID_OTP,
            message: "Invalid OTP",
            display_message: "Invalid OTP",
          };
        case ErrorCode.TIMEOUT_OTP:
            return {
              status_code: StatusCodes.BAD_REQUEST,
              category: ErrorCategory.AUTHENTICATION,
              code: ErrorCode.TIMEOUT_OTP,
              message: "OTP is timeout",
              display_message: "OTP is timeout",
            };  
        case ErrorCode.EMAIL_NOT_EXIST:
          return {
            status_code: StatusCodes.BAD_REQUEST,
            category: ErrorCategory.AUTHENTICATION,
            code: ErrorCode.EMAIL_NOT_EXIST,
            message: "Account with this email ID doesn't exist",
            display_message: "Account with this email ID doesn't exist",
          };
        case ErrorCode.ACCOUNT_DEACTIVATED:
          return {
            status_code: StatusCodes.BAD_REQUEST,
            category: ErrorCategory.AUTHENTICATION,
            code: ErrorCode.ACCOUNT_DEACTIVATED,
            message: "This account is deactivated",
            display_message: "This account is deactivated",
          };
        case ErrorCode.PASSWORD_NOT_MATCH:
          return {
            status_code: StatusCodes.BAD_REQUEST,
            category: ErrorCategory.AUTHENTICATION,
            code: ErrorCode.PASSWORD_NOT_MATCH,
            message: "Wrong Password",
            display_message: "Wrong Password",
          };  
        case ErrorCode.PHONE_NOT_EXIST:
          return {
            status_code: StatusCodes.BAD_REQUEST,
            category: ErrorCategory.AUTHENTICATION,
            code: ErrorCode.PHONE_NOT_EXIST,
            message: "Phone not exists",
            display_message: "Phone not exists",
          }; 
        case ErrorCode.PASSWORD_MISMATCH:
          return {
            status_code: StatusCodes.BAD_REQUEST,
            category: ErrorCategory.AUTHENTICATION,
            code: ErrorCode.PHONE_NOT_EXIST,
            message: "Password do not match",
            display_message: "Password do not match.",
          };  

    default:
      return {
        status_code:  StatusCodes.UNAUTHORIZED,
        category: "Unknown",
        // code,
        message: "Unknown error occured",
        display_message:code,
      };
  }
};
