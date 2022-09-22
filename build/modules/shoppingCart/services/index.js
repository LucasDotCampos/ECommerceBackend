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
        const productSearch = await connection_1.dataSource.manager.query(`SELECT *  FROM shopping_cart as s
        JOIN product as p
        ON s.product_id = p.id
        where s.user_id = '${user_id}'
        ORDER BY p.name ASC
          `);
        return productSearch;
    }
    async delete({ user_id, product_id, quantity, }) {
        const shoppingCartRepository = connection_1.dataSource.manager.getRepository(entities_1.default);
        const shoppingCartProductAlreadyExists = await shoppingCartRepository.findOne({
            where: {
                user_id,
                product_id,
            },
        });
        if (!shoppingCartProductAlreadyExists) {
            throw new Error("No products found in this shopping cart.");
        }
        else if (quantity === 0) {
            await connection_1.dataSource.manager.delete(entities_1.default, {
                user_id,
                product_id,
            });
        }
        else if (quantity > 1) {
            shoppingCartProductAlreadyExists.quantity = quantity;
            await connection_1.dataSource.manager.save(shoppingCartProductAlreadyExists);
            return shoppingCartProductAlreadyExists;
        }
    }
}
exports.default = ShoppingCartService;
