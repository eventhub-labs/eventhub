export interface IResponseUser {
  refreshToken: string;
  accessToken: string;
  email: string;
  username: string;
  name: string;
  surname: string;
  imgUrl: string;
}

export interface IRequestLogin {
  email: string;
  password: string;
}

export interface IRequestRegister {
  email: string;
  password: string;
  username: string;
  name: string;
  surname: string;
  phone?: string;
}
