import { AxiosResponse } from "axios";
import CustomAxios from "./CustomAxios";
import IProduct from "../data_interfaces/IProduct";

const url = "products/";

const create = (product: IProduct): Promise<AxiosResponse<IProduct>> => (
  CustomAxios.post(url, product)
);

const get = (id: number): Promise<AxiosResponse<IProduct>> => (
  CustomAxios.get(`${url}${id}`)
);

const getAll = (): Promise<AxiosResponse<IProduct[]>> => (
  CustomAxios.get(url)
);

const remove = (id: number): Promise<AxiosResponse> => (
  CustomAxios.delete(`${url}${id}/`)
);

const update = (product: IProduct): Promise<AxiosResponse<IProduct>> => (
  CustomAxios.put(`${url}${product.id}/`, product)
);

const updateOrCreate = (product: IProduct): Promise<AxiosResponse<IProduct>> => {
  if (product.id > 0) {
    return update(product);
  }
  return create(product);
}

const ProductDS = {
  create,
  get,
  getAll,
  remove,
  update,
  updateOrCreate,
}

export default ProductDS;
