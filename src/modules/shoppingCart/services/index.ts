import ShoppingCartEntity from "../entities";
import { IShoppingCart } from "../models";
import { dataSource } from "../../../shared/typeorm/connection";

class ShoppingCartService {
  public async create({
    user_id,
    product_id,
    quantity,
  }: IShoppingCart): Promise<ShoppingCartEntity> {
    const shoppingCartRepository =
      dataSource.manager.getRepository(ShoppingCartEntity);

    const shoppingCartProductAlreadyExists =
      await shoppingCartRepository.findOne({
        where: {
          user_id,
          product_id,
        },
      });

    if (shoppingCartProductAlreadyExists) {
      shoppingCartProductAlreadyExists.quantity += quantity;

      await dataSource.manager.save(shoppingCartProductAlreadyExists);

      return shoppingCartProductAlreadyExists;
    } else {
      const shoppingCart = shoppingCartRepository.create({
        user_id,
        product_id,
        quantity,
      });

      const result = await dataSource.manager.save(shoppingCart);
      return result;
    }
  }

  public async getAll({
    user_id,
  }: Partial<IShoppingCart>): Promise<ShoppingCartEntity[]> {
    const productSearch = await dataSource.manager.query(
      `SELECT *  FROM shopping_cart as s
        JOIN product as p
        ON s.product_id = p.id
        where s.user_id = '${user_id}'
        ORDER BY p.name ASC
          `
    );

    return productSearch;
  }

  public async delete({
    user_id,
    product_id,
    quantity,
  }: IShoppingCart): Promise<ShoppingCartEntity> {
    const shoppingCartRepository =
      dataSource.manager.getRepository(ShoppingCartEntity);

    const shoppingCartProductAlreadyExists =
      await shoppingCartRepository.findOne({
        where: {
          user_id,
          product_id,
        },
      });

    if (!shoppingCartProductAlreadyExists) {
      throw new Error("No products found in this shopping cart.");
    } else if (quantity === 0) {
      await dataSource.manager.delete(ShoppingCartEntity, {
        user_id,
        product_id,
      });
    } else if (quantity > 1) {
      shoppingCartProductAlreadyExists.quantity = quantity;
      await dataSource.manager.save(shoppingCartProductAlreadyExists);
      return shoppingCartProductAlreadyExists;
    }
  }
}
export default ShoppingCartService;
