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
    let content = null;
    const shoppingCartRepository =
      dataSource.manager.getRepository(ShoppingCartEntity);

    const shoppingCart = await shoppingCartRepository.find({
      where: {
        user_id,
      },
    });

    shoppingCart.map(async (item) => {
      const query = await dataSource.manager.query(
        `SELECT *  FROM shopping_cart, product  WHERE shopping_cart.user_id  = '${user_id}' AND product.id = '${item.product_id}'`
      );
    });

    return shoppingCart;
  }

  public async deleteOne({
    user_id,
    product_id,
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

    if (
      shoppingCartProductAlreadyExists &&
      shoppingCartProductAlreadyExists.quantity > 1
    ) {
      shoppingCartProductAlreadyExists.quantity -= 1;
      await dataSource.manager.save(shoppingCartProductAlreadyExists);
      return shoppingCartProductAlreadyExists;
    } else {
      await dataSource.manager.delete(ShoppingCartEntity, {
        user_id,
        product_id,
      });
    }
  }

  public async deleteAll({
    user_id,
    product_id,
  }: IShoppingCart): Promise<void> {
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
      await dataSource.manager.delete(ShoppingCartEntity, {
        user_id,
        product_id,
      });
    } else {
      throw new Error("Produto não encontrado");
    }
  }
}
export default ShoppingCartService;
