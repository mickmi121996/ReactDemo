import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import CategoryDS from "../../data_services/CategoryDS";
import ICategory from "../../data_interfaces/ICategory";
import CategoryCard from "./CategoryCard";

function Dashboard(): React.JSX.Element {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    CategoryDS.getAllCategories()
      .then((response) => {
        console.log("Categories loaded", response.data);
        setCategories(response.data);
      })
      .catch((err) => {
        console.log(
          "ERROR: An error occurred while categories loading",
          err,
          err.response
        );
      });
  }, []);

  return (
    <Grid container spacing={2}>
      {categories.map((category) => (
        <Grid key={`category-${category.id}`} item xs={12} sm={6} lg={4}>
          <CategoryCard category={category} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Dashboard;
