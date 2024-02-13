import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Paper, Typography } from "@mui/material";

import CategoryDS from "../../data_services/CategoryDS";
import ICategory from "../../data_interfaces/ICategory";
import IProduct from "../../data_interfaces/IProduct";
import ProductCard from "./ProductCard";

function CategoryView(): React.JSX.Element {
  const { id = "0" } = useParams();
  const categoryId: number = parseInt(id, 10);

  const [category, setCategory] = useState<ICategory | null>(null);

  useEffect(() => {
    CategoryDS.get(categoryId)
      .then((response) => {
        console.log("Category loaded", response.data);
        setCategory(response.data);
      })
      .catch((err) => {
        console.log(
          "ERROR: An error occurred while category loading",
          err,
          err.response
        );
      });
  }, [categoryId]);

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography sx={{ fontSize: 18 }} color="text.secondary">
        {category?.code}
      </Typography>
      <Typography variant="h4">{category?.name}</Typography>
      <Box paddingTop={5}>
        <Typography variant="h6" color="text.secondary">
          Liste des produits
        </Typography>
        <Grid container spacing={2} marginTop={1}>
          {category?.products.map((product: IProduct) => (
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
        </Grid>
      </Box>
    </Paper>
  );
}

export default CategoryView;
