import { Request, Response } from "express";
import ProductService from "../services";

class ProductController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description, price, image } = request.body;

      if (
        !name ||
        name === "" ||
        !description ||
        description === "" ||
        !price ||
        price === "" ||
        !image ||
        image === ""
      ) {
        return response.status(422);
      } else {
        const productService = new ProductService();

        const createProduct = await productService.create({
          name,
          description,
          price,
          image,
        });

        return response.status(200).json(createProduct);
      }
    } catch (err) {
      return response.status(400).json(err.message);
    }
  }

  public async getAllProduct(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const productService = new ProductService();
      const search = await productService.getAllProducts();
      return response.status(200).json(search);
    } catch (err) {
      return response.status(400).json(err.message);
    }
  }

  public async getById(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const { id } = request.params;

      if (!id || id === "") {
        return response.status(422);
      } else {
        const productService = new ProductService();
        const product = await productService.getById({ id });
        return response.status(200).json(product);
      }
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }
}

export default ProductController;
