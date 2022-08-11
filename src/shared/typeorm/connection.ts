import "dotenv/config";
import { DataSource } from "typeorm";
import UserEntity from "../../modules/user/entities/UserEntity";
import ProductEntity from "../../modules/product/entities";
import ShoppingCartEntity from "../../modules/shoppingCart/entities";
import { UserMigration1658376013976 } from "./migrations/1658376013976-UserMigration";
import { ProductMigration1658426814594 } from "./migrations/1658426814594-ProductMigration";
import { shoppingCart1659720883976 } from "./migrations/1659720883976-shoppingCart";

export const dataSource = new DataSource({
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
  entities: [UserEntity, ProductEntity, ShoppingCartEntity],
  migrations: [
    UserMigration1658376013976,
    ProductMigration1658426814594,
    shoppingCart1659720883976,
  ],
});
