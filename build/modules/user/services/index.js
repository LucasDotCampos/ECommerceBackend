"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("../../../shared/typeorm/connection");
const UserEntity_1 = __importDefault(require("../entities/UserEntity"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    async create({ email, password }) {
        const userExists = await connection_1.dataSource.manager
            .getRepository(UserEntity_1.default)
            .findOne({
            where: {
                email,
            },
        });
        if (userExists) {
            throw new Error("User already exists");
        }
        const encryptedPassword = await bcrypt_1.default.hash(password, 10);
        const createUser = connection_1.dataSource.manager.create(UserEntity_1.default, {
            email,
            password: encryptedPassword,
        });
        connection_1.dataSource.manager.save(createUser);
        return createUser;
    }
    async authenticate({ email, password }) {
        const admin = await connection_1.dataSource.manager.getRepository(UserEntity_1.default).findOne({
            where: {
                email,
            },
        });
        if (!admin) {
            throw new Error("Usuário ou senha inválidos");
        }
        const isValidPassword = await bcrypt_1.default.compare(password, admin.password);
        if (!isValidPassword) {
            throw new Error("Usuário ou senha inválidos");
        }
        const secret = process.env.SECRET;
        const token = jsonwebtoken_1.default.sign({ id: admin.id }, `${secret}`, { expiresIn: "1d" });
        return {
            user: admin,
            token,
        };
    }
    async delete({ id }) {
        const userReposity = connection_1.dataSource.manager.getRepository(UserEntity_1.default);
        const user = userReposity.findOne({
            where: {
                id,
            },
        });
        if (!user) {
            throw new Error("Usuário não encontrado");
        }
        await userReposity.delete(id);
    }
    async getAllUsers() {
        const userReposity = connection_1.dataSource.manager.getRepository(UserEntity_1.default);
        const users = userReposity.find();
        return users;
    }
}
exports.default = UserService;
