"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = __importDefault(require("../services"));
class ProductController {
    async create(request, response) {
        try {
            const { name, description, price, image } = request.body;
            if (!name ||
                name === "" ||
                !description ||
                description === "" ||
                !price ||
                price === "" ||
                !image ||
                image === "") {
                return response.status(422);
            }
            else {
                const productService = new services_1.default();
                const createProduct = await productService.create({
                    name,
                    description,
                    price,
                    image,
                });
                return response.status(200).json(createProduct);
            }
        }
        catch (err) {
            return response.status(400).json(err.message);
        }
    }
    async getAllProduct(request, response) {
        try {
            const productService = new services_1.default();
            const search = await productService.getAllProducts();
            return response.status(200).json(search);
        }
        catch (err) {
            return response.status(400).json(err.message);
        }
    }
    async getById(request, response) {
        try {
            const { id } = request.params;
            if (!id || id === "") {
                return response.status(422);
            }
            else {
                const productService = new services_1.default();
                const product = await productService.getById({ id });
                return response.status(200).json(product);
            }
        }
        catch (err) {
            return response.status(400).json(err.message);
        }
    }
}
exports.default = ProductController;
