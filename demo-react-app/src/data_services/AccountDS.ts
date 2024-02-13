import { AxiosResponse } from "axios";
import CustomAxios, { setLocalToken, unsetLocalToken } from "./CustomAxios";
import IUser, { IAuth } from "../data_interfaces/IUser";

const login = (username: string, password: string): Promise<boolean> => {
  const promise = new Promise<boolean>((resolve, reject) => {
    CustomAxios
      .post('auth/token/', { username, password })
      .then((response) => {
        const authData: IAuth = response.data;
        setLocalToken(authData);
        console.log('Successful login');
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  })
  return promise;
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

const AccountDS = {
  login,
  logout,
  register,
}

export default AccountDS;
