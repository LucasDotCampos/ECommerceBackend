"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entities_1 = __importDefault(require("../entities"));
const connection_1 = require("../../../shared/typeorm/connection");
class ShoppingCartService {
    async create({ user_id, product_id, quantity, }) {
        const shoppingCartRepository = connection_1.dataSource.manager.getRepository(entities_1.default);
        const shoppingCartProductAlreadyExists = await shoppingCartRepository.findOne({
            where: {
                user_id,
                product_id,
            },
        });
        if (shoppingCartProductAlreadyExists) {
            shoppingCartProductAlreadyExists.quantity += quantity;
            await connection_1.dataSource.manager.save(shoppingCartProductAlreadyExists);
            return shoppingCartProductAlreadyExists;
        }
        else {
            const shoppingCart = shoppingCartRepository.create({
                user_id,
                product_id,
                quantity,
            });
            const result = await connection_1.dataSource.manager.save(shoppingCart);
            return result;
        }
    }
    async getAll({ user_id, }) {
        const shoppingCartRepository = connection_1.dataSource.manager.getRepository(entities_1.default);
        const shoppingCart = await shoppingCartRepository.find({
            where: {
                user_id,
            },
        });
        return shoppingCart;
    }
    async deleteOne({ user_id, product_id, }) {
        const shoppingCartRepository = connection_1.dataSource.manager.getRepository(entities_1.default);
        const shoppingCartProductAlreadyExists = await shoppingCartRepository.findOne({
            where: {
                user_id,
                product_id,
            },
        });
        if (shoppingCartProductAlreadyExists &&
            shoppingCartProductAlreadyExists.quantity > 1) {
            shoppingCartProductAlreadyExists.quantity -= 1;
            await connection_1.dataSource.manager.save(shoppingCartProductAlreadyExists);
            return shoppingCartProductAlreadyExists;
        }
        else {
            await connection_1.dataSource.manager.delete(entities_1.default, {
                user_id,
                product_id,
            });
        }
    }
    async deleteAll({ user_id, product_id, }) {
        const shoppingCartRepository = connection_1.dataSource.manager.getRepository(entities_1.default);
        const shoppingCartProductAlreadyExists = await shoppingCartRepository.findOne({
            where: {
                user_id,
                product_id,
            },
        });
        if (shoppingCartProductAlreadyExists) {
            await connection_1.dataSource.manager.delete(entities_1.default, {
                user_id,
                product_id,
            });
        }
        else {
            throw new Error("Produto não encontrado");
        }
    }
}
exports.default = ShoppingCartService;
