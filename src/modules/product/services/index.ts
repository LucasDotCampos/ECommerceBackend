import { dataSource } from "../../../shared/typeorm/connection";
import ProductEntity from "../entities";

import { IProduct } from "../models";

class ProductService {
  public async create({
    name,
    description,
    price,
    image,
  }: Partial<IProduct>): Promise<ProductEntity> {
    const productRepository = dataSource.manager.getRepository(ProductEntity);

    const createProduct = productRepository.create({
      name,
      description,
      price,
      image,
    });

    await dataSource.manager.save(createProduct);

    return createProduct;
  }

  public async getAllProducts(): Promise<ProductEntity[]> {
    const avaliationRepository =
      dataSource.manager.getRepository(ProductEntity);
    const search = avaliationRepository.find();

    return search;
  }

  public async getById({ id }: Partial<IProduct>): Promise<ProductEntity> {
    const productRepository = dataSource.manager.getRepository(ProductEntity);

    const product = await productRepository.findOne({
      where: {
        id,
      },
    });

    return product;
  }
}
export default ProductService;
