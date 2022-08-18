"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("../../../shared/typeorm/connection");
const entities_1 = __importDefault(require("../entities"));
class ProductService {
    async create({ name, description, price, image, }) {
        const productRepository = connection_1.dataSource.manager.getRepository(entities_1.default);
        const createProduct = productRepository.create({
            name,
            description,
            price,
            image,
        });
        await connection_1.dataSource.manager.save(createProduct);
        return createProduct;
    }
    async getAllProducts() {
        const avaliationRepository = connection_1.dataSource.manager.getRepository(entities_1.default);
        const search = avaliationRepository.find();
        return search;
    }
    async getById({ id }) {
        const productRepository = connection_1.dataSource.manager.getRepository(entities_1.default);
        const product = await productRepository.findOne({
            where: {
                id,
            },
        });
        return product;
    }
}
exports.default = ProductService;
