import { createContext, useState } from "react";

export interface IFavoriteContext {
  productIds: number[]
  init: (productIds: number[]) => void
  contains: (productId: number) => boolean
  add: (productId: number) => void
  remove: (productId: number) => void
}

const defaultFavoriteContext: IFavoriteContext = {
  productIds: [],
  init: (): void => {},
  contains: (): boolean => false,
  add: (): void => {},
  remove: (): void => {},
}

export const FavoriteContextState = (): IFavoriteContext => {
  const [favoriteContext, setFavoriteContext] = useState<IFavoriteContext>(defaultFavoriteContext);

  favoriteContext.init = (productIds: number[]): void => {
    favoriteContext.productIds = [];
    productIds.forEach((productId: number) => {
      favoriteContext.productIds.push(productId);
    });  
    setFavoriteContext({ ...favoriteContext });
  }

  favoriteContext.contains = (productId: number): boolean => {
    const index = favoriteContext.productIds.indexOf(productId);
    return index >= 0;
  }

  favoriteContext.add = (productId: number): void => {
    const index = favoriteContext.productIds.indexOf(productId);
    if (index < 0) {
      favoriteContext.productIds.push(productId);
      setFavoriteContext({ ...favoriteContext });
    }
  }

  favoriteContext.remove = (productId: number): void => {
    const index = favoriteContext.productIds.indexOf(productId);
    if (index >= 0) {
      favoriteContext.productIds.splice(index, 1);
      setFavoriteContext({ ...favoriteContext });
    }
  }

  return favoriteContext;
}

const FavoriteContext = createContext<IFavoriteContext>(defaultFavoriteContext);
export default FavoriteContext;
