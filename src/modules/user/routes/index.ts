import { Router } from "express";
import UserController from "../controllers";

const userRouter = Router();

const userController = new UserController();

userRouter.post("/login", userController.authenticate);
userRouter.post("/register", userController.create);
userRouter.get("/", userController.getAllUsers);
userRouter.delete("/remove/:id", userController.delete);

export default userRouter;
