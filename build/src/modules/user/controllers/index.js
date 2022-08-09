"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = __importDefault(require("../services"));
class UserController {
    async create(request, response) {
        try {
            const { name, password } = request.body;
            const userService = new services_1.default();
            const admin = await userService.create({ name, password });
            return response.status(200).json(admin);
        }
        catch (err) {
            return response.status(400).json(err.message);
        }
    }
    async authenticate(request, response) {
        try {
            const { name, password } = request.body;
            const userService = new services_1.default();
            const user = await userService.authenticate({ name, password });
            return response.status(200).json(user);
        }
        catch (err) {
            return response.status(400).json(err.message);
        }
    }
    async delete(request, response) {
        try {
            const { id } = request.params;
            const userService = new services_1.default();
            await userService.delete({ id });
            return response.status(200).json("Usuário deletado com sucesso");
        }
        catch (err) {
            return response.status(404).json(err.message);
        }
    }
    async getAllUsers(request, response) {
        try {
            const userService = new services_1.default();
            const users = await userService.getAllUsers();
            return response.status(200).json(users);
        }
        catch (err) {
            return response.status(400).json(err.message);
        }
    }
}
exports.default = UserController;
