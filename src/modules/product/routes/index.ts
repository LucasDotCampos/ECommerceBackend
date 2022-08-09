import { Router } from "express";
import ProductController from "../controllers";

const productRouter = Router();
const productController = new ProductController();

productRouter.get("/", productController.getAllProduct);
productRouter.post("/register", productController.create);

export default productRouter;
