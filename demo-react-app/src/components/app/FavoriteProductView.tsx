import { useContext, useEffect, useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";

import FavoriteContext, { IFavoriteContext } from "../FavoriteContext";
import FavoriteProductDS from "../../data_services/FavoriteProductDS";
import IProduct from "../../data_interfaces/IProduct";
import ProductCard from "./ProductCard";

function FavoriteProductView(): JSX.Element {
  const favoriteContext: IFavoriteContext = useContext(FavoriteContext);
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    FavoriteProductDS.getMyFavoriteProducts()
      .then((response) => {
        console.log("Favorite products loaded", response.data);
        const productsLoaded: IProduct[] = response.data;
        setProducts(productsLoaded);
      })
      .catch((err) => {
        console.log(
          "ERROR: An error occurred while favorite products loading",
          err,
          err.response
        );
      });
  }, [favoriteContext]);

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h4">Vos produits favoris</Typography>
      <Box paddingTop={5}>
        <Grid container spacing={2} marginTop={1}>
          {products.length > 0 ? (
            <>
              {products.map((product: IProduct) => (
                <Grid
                  key={`product-${product.id}`}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                >
                  <ProductCard product={product} />
                </Grid>
              ))}
            </>
          ) : (
            <Box padding={2}>Aucun produit favori.</Box>
          )}
        </Grid>
      </Box>
    </Paper>
  );
}

export default FavoriteProductView;
