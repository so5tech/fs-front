import { Request, Response } from "express";

export type ErrorMessageFunction = (code: number) => void;

type U = unknown;
export type ErrorResponse = {
  req_id?:string;
  status_code: number;
  category?: string;
  code?: number | string
  message?: string;
  display_message?: string;
  error?: boolean;
  additional_info?: string | string[] | U[];
};

export type SuccessResponse = {
  req_id?: string,
  success: true;
  status_code: number;
  message: string;
  display_message: string;
}


export interface ExtendedResponse extends Response {
  sendErrorMessage : (code?: string) => void;
  sendSuccessMessage : (statusCode: number, message?: string) => void;
}


export type bearerToken = {
  email : string,
  _id: string
}

export type adminBearerToken = {
  email : string;
  _id : string;
};

export interface ExtendedRequest extends Request{
  id?:string,
  files?:any,
  file?:[],
  user? : bearerToken,
  admin? : adminBearerToken,
  oauth?: {
    email_id: string,

  }
}

