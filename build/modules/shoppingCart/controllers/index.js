"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = __importDefault(require("../services"));
class ShoppingCartController {
    async create(request, response) {
        try {
            const { user_id, product_id } = request.body;
            const shoppingCartService = new services_1.default();
            if (request.body.quantity === undefined) {
                const quantity = 1;
                const shoppingCart = await shoppingCartService.create({
                    user_id,
                    product_id,
                    quantity,
                });
                return response.status(200).json(shoppingCart);
            }
            else {
                const shoppingCart = await shoppingCartService.create({
                    user_id,
                    product_id,
                    quantity: request.body.quantity,
                });
                return response.status(200).json(shoppingCart);
            }
        }
        catch (err) {
            return response.status(400).json(err.message);
        }
    }
    async getAll(request, response) {
        try {
            const { user_id } = request.params;
            const shoppingCartService = new services_1.default();
            const shoppingCart = await shoppingCartService.getAll({ user_id });
            return response.status(200).json(shoppingCart);
        }
        catch (err) {
            return response.status(400).json(err.message);
        }
    }
    async deleteOne(request, response) {
        try {
            const { user_id, product_id } = request.body;
            const shoppingCartService = new services_1.default();
            const shoppingCart = await shoppingCartService.deleteOne({
                user_id,
                product_id,
            });
            return response.status(200).json(shoppingCart);
        }
        catch (err) {
            return response.status(400).json(err.message);
        }
    }
    async deleteAll(request, response) {
        try {
            const { user_id, product_id } = request.body;
            const shoppingCartService = new services_1.default();
            const shoppingCart = await shoppingCartService.deleteAll({
                user_id,
                product_id,
            });
            return response.status(200).json(shoppingCart);
        }
        catch (err) {
            return response.status(400).json(err.message);
        }
    }
}
exports.default = ShoppingCartController;
