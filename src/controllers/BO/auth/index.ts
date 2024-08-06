import { Router } from "express";
import LoginController from "./login";

export const Auth = Router();

Auth.post('/login', LoginController)


