"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
require("dotenv/config");
const connection_1 = require("../typeorm/connection");
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(routes_1.default);
connection_1.dataSource
    .initialize()
    .then(() => {
    console.log("Database connected");
})
    .catch((err) => {
    console.error("Database connection error: ", err.message);
});
app.listen(process.env.PORT, () => console.log(`Server is working on ${process.env.PORT} port`));
