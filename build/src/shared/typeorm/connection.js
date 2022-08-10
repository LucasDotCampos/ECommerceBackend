"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const UserEntity_1 = __importDefault(require("../../modules/user/entities/UserEntity"));
const entities_1 = __importDefault(require("../../modules/product/entities"));
const _1658376013976_UserMigration_1 = require("./migrations/1658376013976-UserMigration");
const _1658426814594_ProductMigration_1 = require("./migrations/1658426814594-ProductMigration");
require("dotenv/config");
const entities_2 = __importDefault(require("../../modules/shoppingCart/entities"));
const _1659720883976_shoppingCart_1 = require("./migrations/1659720883976-shoppingCart");
exports.dataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: `${process.env.DB_HOST}`,
    port: 5432,
    username: `${process.env.DB_USERNAME}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DATABASE}`,
    extra: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    entities: [UserEntity_1.default, entities_1.default, entities_2.default],
    migrations: [
        _1658376013976_UserMigration_1.UserMigration1658376013976,
        _1658426814594_ProductMigration_1.ProductMigration1658426814594,
        _1659720883976_shoppingCart_1.shoppingCart1659720883976,
    ],
});
