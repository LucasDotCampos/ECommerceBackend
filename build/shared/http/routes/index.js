"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_1 = __importDefault(require("../../../modules/user/routes"));
const routes_2 = __importDefault(require("../../../modules/shoppingCart/routes"));
const routes_3 = __importDefault(require("../../../modules/product/routes"));
const router = (0, express_1.Router)();
router.use("/user", routes_1.default);
router.use("/shoppingcart", routes_2.default);
router.use("/product", routes_3.default);
exports.default = router;
