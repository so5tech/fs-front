import express from 'express';

import { User } from "./user";
import { Auth } from "./auth";

export const ApiRouter = express.Router();

ApiRouter.use('/user', User);
ApiRouter.use('/auth', Auth);