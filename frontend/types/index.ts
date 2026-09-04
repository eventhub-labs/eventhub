export interface IResponseUser {
  refreshToken: string;
  accessToken: string;
  email: string;
  username: string;
  name: string;
  surname: string;
  imgSrc: string;
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

export interface IRequestUpdateUser {
  username: string;
  name: string;
  surname: string;
  email: string;
  phone?: string;
}

export interface IRequestChangePassword {
  currentPassword: string;
  newPassword: string;
}
