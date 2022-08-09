"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = __importDefault(require("../controllers"));
const userRouter = (0, express_1.Router)();
const userController = new controllers_1.default();
userRouter.post("/login", userController.authenticate);
userRouter.post("/register", userController.create);
userRouter.get("/", userController.getAllUsers);
userRouter.delete("/remove/:id", userController.delete);
exports.default = userRouter;
