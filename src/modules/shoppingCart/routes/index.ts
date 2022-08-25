import { Router } from "express";
import isAuthenticated from "../../../shared/middlewares/isAuthenticated";
import ShoppingCartController from "../controllers";

const shoppingCartRouter = Router();

const shoppingCartController = new ShoppingCartController();

shoppingCartRouter.post(
  "/register",
  isAuthenticated,
  shoppingCartController.create
);
shoppingCartRouter.get(
  "/:user_id",
  isAuthenticated,
  shoppingCartController.getAll
);
shoppingCartRouter.delete(
  "/deleteone/:user_id/:product_id",
  isAuthenticated,
  shoppingCartController.deleteOne
);
shoppingCartRouter.delete(
  "/deleteall/:user_id",
  isAuthenticated,
  shoppingCartController.deleteAll
);

export default shoppingCartRouter;
