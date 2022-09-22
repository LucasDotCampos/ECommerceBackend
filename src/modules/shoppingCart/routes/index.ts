import { Router } from "express";
import isAuthenticated from "../../../shared/middlewares/isAuthenticated";
import ShoppingCartController from "../controllers";

const shoppingCartRouter = Router();

const shoppingCartController = new ShoppingCartController();

shoppingCartRouter.post(
  "/register/:user_id/:product_id",
  isAuthenticated,
  shoppingCartController.create
);
shoppingCartRouter.get(
  "/:user_id",
  isAuthenticated,
  shoppingCartController.getAll
);
shoppingCartRouter.delete(
  "/delete/:user_id/:product_id",
  isAuthenticated,
  shoppingCartController.delete
);

export default shoppingCartRouter;
