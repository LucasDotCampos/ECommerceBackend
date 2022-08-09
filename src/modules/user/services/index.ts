import { dataSource } from "../../../shared/typeorm/connection";
import UserEntity from "../entities/adminEntity";
import { IUser, IUserId, IUserToken } from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {
  public async create({ name, password }: IUser): Promise<UserEntity> {
    const userExists = await dataSource.manager
      .getRepository(UserEntity)
      .findOne({
        where: {
          name,
        },
      });
    if (userExists) {
      throw new Error("User already exists");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const createUser = dataSource.manager.create(UserEntity, {
      name,
      password: encryptedPassword,
    });
    dataSource.manager.save(createUser);

    return createUser;
  }

  public async authenticate({ name, password }: IUser): Promise<IUserToken> {
    const admin = await dataSource.manager.getRepository(UserEntity).findOne({
      where: {
        name,
      },
    });

    if (!admin) {
      throw new Error("Usuário ou senha inválidos");
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);

    if (!isValidPassword) {
      throw new Error("Usuário ou senha inválidos");
    }

    const secret = process.env.SECRET;
    const token = jwt.sign({ id: admin.id }, `${secret}`, { expiresIn: "1d" });
    return {
      user: admin,
      token,
    };
  }

  public async delete({ id }: IUserId): Promise<void> {
    const userReposity = dataSource.manager.getRepository(UserEntity);
    const user = userReposity.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    await userReposity.delete(id);
  }

  public async getAllUsers(): Promise<UserEntity[]> {
    const userReposity = dataSource.manager.getRepository(UserEntity);
    const users = userReposity.find();

    return users;
  }
}

export default UserService;
