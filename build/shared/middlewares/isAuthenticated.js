"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
function isAuthenticated(request, response, next) {
    try {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            throw new Error("Token not found");
        }
        const [, token] = authHeader.split(" ");
        const secret = process.env.SECRET;
        const decodedToken = (0, jsonwebtoken_1.verify)(token, `${secret}`);
        if (!decodedToken) {
            throw new Error("Invalid token.");
        }
        const { id } = decodedToken;
        request.user_id = id;
        return next();
    }
    catch (err) {
        return response.status(400).json(err.message);
    }
}
exports.default = isAuthenticated;
