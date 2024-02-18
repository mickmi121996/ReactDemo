import { AxiosResponse } from "axios";
import CustomAxios, { setLocalToken, unsetLocalToken } from "./CustomAxios";
import IUser, { IAuth } from "../data_interfaces/IUser";


const login = (username: string, password: string): Promise<IAuth> => {
  return CustomAxios
    .post<IAuth>('auth/token/', { username, password })
    .then((response) => {
      const authData: IAuth = response.data;
      setLocalToken(authData);
      console.log('Successful login');
      return authData;
    })
    .catch((err) => {
      throw err;
    });
}


const logout = (): Promise<boolean> => {
  const promise = new Promise<boolean>((resolve, reject) => {
    unsetLocalToken();
    console.log('Successful logout');
    resolve(true);
  });
  return promise;
}

const register = (
  firstname: string,
  lastname: string,
  username: string,
  email: string,
  password: string,
): Promise<AxiosResponse<IUser>> => (
  CustomAxios.post<unknown, AxiosResponse<IUser>>(
    'auth/register/', { first_name: firstname, last_name: lastname, username, email, password }
  )
);

const getMe = (): Promise<IUser> => {
  return CustomAxios.get<IUser>('user/me')
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

const AccountDS = {
  login,
  logout,
  register,
  getMe,
}

export default AccountDS;
