"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductMigration1658426814594 = void 0;
const typeorm_1 = require("typeorm");
class ProductMigration1658426814594 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "product",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "uuid_generate_v4()",
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "description",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "price",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "image",
                    type: "varchar",
                    isNullable: false,
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
        await queryRunner.dropTable("avaliation");
    }
}
exports.ProductMigration1658426814594 = ProductMigration1658426814594;
