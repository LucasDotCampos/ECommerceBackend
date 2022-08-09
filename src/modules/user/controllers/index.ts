import { Request, Response } from "express";
import UserService from "../services";

class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, password } = request.body;
      const userService = new UserService();

      const admin = await userService.create({ name, password });
      return response.status(200).json(admin);
    } catch (err) {
      return response.status(400).json(err.message);
    }
  }

  public async authenticate(request: Request, response: Response) {
    try {
      const { name, password } = request.body;

      const userService = new UserService();
      const user = await userService.authenticate({ name, password });
      return response.status(200).json(user);
    } catch (err) {
      return response.status(400).json(err.message);
    }
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const userService = new UserService();
      await userService.delete({ id });

      return response.status(200).json("Usuário deletado com sucesso");
    } catch (err) {
      return response.status(404).json(err.message);
    }
  }
  public async getAllUsers(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const userService = new UserService();
      const users = await userService.getAllUsers();
      return response.status(200).json(users);
    } catch (err) {
      return response.status(400).json(err.message);
    }
  }
}
export default UserController;
