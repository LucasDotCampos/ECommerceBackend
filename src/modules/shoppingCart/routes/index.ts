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
shoppingCartRouter.get("/", isAuthenticated, shoppingCartController.getAll);
shoppingCartRouter.delete(
  "/deleteone",
  isAuthenticated,
  shoppingCartController.deleteOne
);
shoppingCartRouter.delete(
  "/deleteall",
  isAuthenticated,
  shoppingCartController.deleteAll
);

export default shoppingCartRouter;
