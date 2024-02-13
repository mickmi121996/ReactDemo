import { AxiosResponse } from "axios";
import CustomAxios from "./CustomAxios";
import ICategory from "../data_interfaces/ICategory";

const url = "categories/";

const create = (category: ICategory): Promise<AxiosResponse<ICategory>> => (
  CustomAxios.post(url, category)
);

const get = (id: number): Promise<AxiosResponse<ICategory>> => (
  CustomAxios.get(`${url}${id}`)
);

const getAll = (): Promise<AxiosResponse<ICategory[]>> => (
  CustomAxios.get(url)
);

const remove = (id: number): Promise<AxiosResponse> => (
  CustomAxios.delete(`${url}${id}/`)
);

const update = (category: ICategory): Promise<AxiosResponse<ICategory>> => (
  CustomAxios.put(`${url}${category.id}/`, category)
);

const updateOrCreate = (category: ICategory): Promise<AxiosResponse<ICategory>> => {
  if (category.id > 0) {
    return update(category);
  }
  return create(category);
}

const getAllCategories = (): Promise<AxiosResponse<ICategory[]>> => (
  CustomAxios.get('get-all-categories')
);

const CategoryDS = {
  create,
  get,
  getAll,
  remove,
  update,
  updateOrCreate,

  getAllCategories,
}

export default CategoryDS;
