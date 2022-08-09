"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMigration1658376013976 = void 0;
const typeorm_1 = require("typeorm");
class UserMigration1658376013976 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "user",
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
                },
                {
                    name: "password",
                    type: "varchar",
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
        await queryRunner.dropTable("user");
    }
}
exports.UserMigration1658376013976 = UserMigration1658376013976;
