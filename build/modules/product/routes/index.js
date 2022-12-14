"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = __importDefault(require("../controllers"));
const productRouter = (0, express_1.Router)();
const productController = new controllers_1.default();
productRouter.get("/", productController.getAllProduct);
productRouter.post("/register", productController.create);
productRouter.get("/:id", productController.getById);
exports.default = productRouter;
