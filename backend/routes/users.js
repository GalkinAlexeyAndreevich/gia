import { Router } from "express";
import { usersController } from "../controllers/index.js";

export const usersRouter = Router()

usersRouter.get('/getUsers',usersController.getUsers)
usersRouter.get('/usersOnRole:roleId',usersController.getUsersOnRole)
usersRouter.get('/usersOnId:userId',usersController.getUsersOnId)
usersRouter.post('/createUser',usersController.createUser)
usersRouter.post('/login',usersController.login)
