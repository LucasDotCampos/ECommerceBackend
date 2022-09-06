export interface IUser {
  email: string;
  password: string;
}

export interface IUserToken {
  user: IUser;
  token: string;
}

export interface IUserId {
  id: string;
}

export interface ITokenPayload {
  id: string;
  iat: number;
  exp: number;
}
