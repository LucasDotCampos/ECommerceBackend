"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shoppingCart1659720883976 = void 0;
const typeorm_1 = require("typeorm");
class shoppingCart1659720883976 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "shopping_cart",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "uuid_generate_v4()",
                },
                {
                    name: "user_id",
                    type: "uuid",
                },
                {
                    name: "product_id",
                    type: "uuid",
                },
                {
                    name: "quantity",
                    type: "int",
                },
                {
                    name: "created_at",
                    type: "timestamp with time zone",
                    default: "now()",
                },
                {
                    name: "updated_at",
                    type: "timestamp with time zone",
                    default: "now()",
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("shopping_cart");
    }
}
exports.shoppingCart1659720883976 = shoppingCart1659720883976;
