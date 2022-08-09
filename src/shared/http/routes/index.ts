import { Router } from "express";
import userRouter from "../../../modules/user/routes";
import shoppingCartRouter from "../../../modules/shoppingCart/routes";
import productRouter from "../../../modules/product/routes";

const router = Router();

router.use("/user", userRouter);
router.use("/shoppingcart", shoppingCartRouter);
router.use("/product", productRouter);

export default router;
