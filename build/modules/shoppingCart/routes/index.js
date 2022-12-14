"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuthenticated_1 = __importDefault(require("../../../shared/middlewares/isAuthenticated"));
const controllers_1 = __importDefault(require("../controllers"));
const shoppingCartRouter = (0, express_1.Router)();
const shoppingCartController = new controllers_1.default();
shoppingCartRouter.post("/register/:user_id/:product_id", isAuthenticated_1.default, shoppingCartController.create);
shoppingCartRouter.get("/:user_id", isAuthenticated_1.default, shoppingCartController.getAll);
shoppingCartRouter.delete("/delete/:user_id/:product_id", isAuthenticated_1.default, shoppingCartController.delete);
exports.default = shoppingCartRouter;
