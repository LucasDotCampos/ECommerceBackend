import { Request, Response } from "express-serve-static-core";
import ShoppingCartService from "../services";

class ShoppingCartController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { user_id, product_id } = request.body;

      const shoppingCartService = new ShoppingCartService();

      if (request.body.quantity === undefined) {
        const quantity = 1;
        const shoppingCart = await shoppingCartService.create({
          user_id,
          product_id,
          quantity,
        });
        return response.status(200).json(shoppingCart);
      } else {
        const shoppingCart = await shoppingCartService.create({
          user_id,
          product_id,
          quantity: request.body.quantity,
        });
        return response.status(200).json(shoppingCart);
      }
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }

  public async getAll(request: Request, response: Response): Promise<Response> {
    try {
      const { user_id } = request.params;
      const shoppingCartService = new ShoppingCartService();

      const shoppingCart = await shoppingCartService.getAll({ user_id });

      return response.status(200).json(shoppingCart);
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }
  public async deleteOne(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const { user_id, product_id } = request.body;

      const shoppingCartService = new ShoppingCartService();

      const shoppingCart = await shoppingCartService.deleteOne({
        user_id,
        product_id,
      });

      return response.status(200).json(shoppingCart);
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }

  public async deleteAll(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const { user_id, product_id } = request.body;
      const shoppingCartService = new ShoppingCartService();

      const shoppingCart = await shoppingCartService.deleteAll({
        user_id,
        product_id,
      });
      return response.status(200).json(shoppingCart);
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }
}
export default ShoppingCartController;
