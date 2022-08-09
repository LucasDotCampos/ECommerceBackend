"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvaliationMigration1658426814594 = void 0;
const typeorm_1 = require("typeorm");
class AvaliationMigration1658426814594 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "avaliation",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "uuid_generate_v4()",
                },
                {
                    name: "sector",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "device",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "avaliation",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "company",
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
exports.AvaliationMigration1658426814594 = AvaliationMigration1658426814594;
