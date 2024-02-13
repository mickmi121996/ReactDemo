import IProduct from "./IProduct";

export default interface ICategory {
  id: number
  code: string
  name: string
  products: IProduct[]
}
