import { AxiosResponse } from "axios";
import CustomAxios from "./CustomAxios";
import IProduct from "../data_interfaces/IProduct";

const getMyFavoriteProducts = (): Promise<AxiosResponse<IProduct[]>> => (
  CustomAxios.get('my-favorite-products')
);

const addMyFavoriteProducts = (productId: number): Promise<AxiosResponse<IProduct>> => (
  CustomAxios.post('my-favorite-products', productId)
);

const removeMyFavoriteProducts = (productId: number): Promise<AxiosResponse> => (
  CustomAxios.delete(`my-favorite-products/${productId}`)
);

const FavoriteProductDS = {
  getMyFavoriteProducts,
  addMyFavoriteProducts,
  removeMyFavoriteProducts,
}

export default FavoriteProductDS;
