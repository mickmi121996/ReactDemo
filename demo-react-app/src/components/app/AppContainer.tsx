import React, { useContext, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { storageAccessToken } from "../../data_services/CustomAxios";
import { Box, Container } from "@mui/material";

import FavoriteContext, { IFavoriteContext } from "../FavoriteContext";
import FavoriteProductDS from "../../data_services/FavoriteProductDS";
import IProduct from "../../data_interfaces/IProduct";

function AppContainer(): React.JSX.Element | null {
  const favoriteContext: IFavoriteContext = useContext(FavoriteContext);
  const favoriteContextInitialized = useRef<boolean>(false);

  useEffect(() => {
    if (
      localStorage.getItem(storageAccessToken) &&
      !favoriteContextInitialized.current
    ) {
      favoriteContextInitialized.current = true;
      FavoriteProductDS.getMyFavoriteProducts()
        .then((response) => {
          console.log("Initial favorite products loaded", response.data);
          const products: IProduct[] = response.data;
          const productIds: number[] = products.map(
            (product: IProduct) => product.id
          );
          favoriteContext.init(productIds);
        })
        .catch((err) => {
          console.log(
            "ERROR: An error occurred while favorite products loading",
            err,
            err.response
          );
        });
    }
  }, [favoriteContext]);

  return (
    <Container component="main">
      <Box padding={3}>
        <Outlet />
      </Box>
    </Container>
  );
}

export default AppContainer;
