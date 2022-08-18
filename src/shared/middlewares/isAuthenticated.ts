import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { ITokenPayload } from "../../modules/user/models";

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Response | void {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new Error("Token not found");
    }

    const [, token] = authHeader.split(" ");

    const secret = process.env.SECRET;
    const decodedToken = verify(token, `${secret}`);

    if (!decodedToken) {
      throw new Error("Invalid token.");
    }

    const { id } = decodedToken as ITokenPayload;

    request.user_id = id;
    return next();
  } catch (err: any) {
    return response.status(400).json(err.message);
  }
}
