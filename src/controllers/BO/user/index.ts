import { Router } from "express";
import PostController from "./post";
import GetController from "./get";
import SoftDeleteController from "./softDelete";

export const User = Router();

User.post('/', PostController)
User.get('/', GetController)
User.post('/:type/:id', SoftDeleteController)



