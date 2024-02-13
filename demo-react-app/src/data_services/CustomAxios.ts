import axios from "axios";
import { IAuth } from "../data_interfaces/IUser";

const baseURL = process.env.REACT_APP_API_URL;
const headerToken = "Bearer ";
export const storageAccessToken = "demo_access_token";
const storageRefreshToken = "demo_refresh_token";
export const storageUsername = "demo_user_name";

const CustomAxios = axios.create({
  baseURL,
  timeout: 30000, // 30 seconds
  headers: {
    'Authorization': localStorage.getItem(storageAccessToken)
      ? headerToken + localStorage.getItem(storageAccessToken)
      : null,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const setLocalToken = (authData: IAuth): void => {
  localStorage.setItem(storageAccessToken, authData.access);
  localStorage.setItem(storageRefreshToken, authData.refresh);
  localStorage.setItem(storageUsername, authData.user.first_name);
  CustomAxios.defaults.headers.Authorization = headerToken + authData.access;
}

export const unsetLocalToken = (): void => {
  localStorage.removeItem(storageAccessToken);
  localStorage.removeItem(storageRefreshToken);
  localStorage.removeItem(storageUsername);
  CustomAxios.defaults.headers.Authorization = null;
}

CustomAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 401) {
          if (error.response.data.code === 'token_not_valid') {
            const refreshToken: string | null = localStorage.getItem(storageRefreshToken);

            if (refreshToken) {
              const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

              // exp date in token is expressed in seconds, while now() returns milliseconds:
              const now = Math.ceil(Date.now() / 1000);
              
              if (tokenParts.exp > now) {
                return CustomAxios
                  .post('auth/token-refresh/', { refresh: refreshToken })
                  .then((response) => {
                    console.log('Axios - Access token refreshed');
                    localStorage.setItem(storageAccessToken, response.data.access);
                    if (response.data.refresh) {
                      localStorage.setItem(storageRefreshToken, response.data.refresh);
                    }

                    CustomAxios.defaults.headers.Authorization =  headerToken + response.data.access;
                    if (error.config) {
                      error.config.headers.Authorization = headerToken + response.data.access;
                      return CustomAxios(error.config);
                    } else {
                      console.log('Axios error.config is null - auth/token-refresh/')
                    }
                  })
                  .catch((err) => {
                    console.log('Axios error handler - auth/token-refresh/', err, err.response)
                  });
              }
              unsetLocalToken();
            }
          }
          if (error.config?.url !== 'auth/token/') {
            window.location.href = '/login/';
          }
        }
      }
    }

    return Promise.reject(error);
  },
);

export default CustomAxios;
