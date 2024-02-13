import React, { useEffect, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, SelectChangeEvent, Typography } from "@mui/material";

import FormSelect, { FormSelectMenuItemData } from "../controls/FormSelect";
import FormTextField from "../controls/FormTextField";
import ProgressBackdrop from "../controls/ProgressBackdrop";

import CategoryDS from "../../data_services/CategoryDS";
import ProductDS from "../../data_services/ProductDS";
import ICategory from "../../data_interfaces/ICategory";
import IProduct from "../../data_interfaces/IProduct";

type FormProductEditFields = {
  code: string;
  name: string;
};

function ProductEdit(): React.JSX.Element {
  const { id = "0" } = useParams();
  const productId: number = parseInt(id, 10);

  const navigate: NavigateFunction = useNavigate();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [categoryMenuItems, setCategoryMenuItems] = useState<
    FormSelectMenuItemData[]
  >([]);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const formSchema = yup.object().shape({
    code: yup
      .string()
      .required("Le code est obligatoire")
      .max(20, "Le code doit contenir au plus 20 caractères"),
    name: yup
      .string()
      .required("Le nom est obligatoire")
      .max(100, "Le nom doit contenir au plus 100 caractères"),
  });

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<FormProductEditFields>({
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    ProductDS.get(productId)
      .then((response) => {
        const product: IProduct | null = response.data;
        console.log("Successful getting product", product);
        if (product !== null) {
          setProduct(product);
          reset(product as FormProductEditFields);
        }
      })
      .catch((err) => {
        console.log(
          "ERROR: An error occurred while getting product",
          err,
          err.response
        );
      });
  }, [productId, reset]);

  useEffect(() => {
    CategoryDS.getAllCategories()
      .then((response) => {
        const categories: ICategory[] = response.data;
        console.log("Successful getting categories", categories);

        const categoryData: FormSelectMenuItemData[] = [];
        categories.forEach((category: ICategory) => {
          categoryData.push({
            value: category.id.toString(),
            text: category.name,
          });
        });
        setCategoryMenuItems(categoryData);
      })
      .catch((err) => {
        console.log(
          "ERROR: An error occurred while getting categories",
          err,
          err.response
        );
      });
  }, []);

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    if (product !== null) {
      product.category = parseInt(e.target.value, 10);
      setProduct(product);
      reset(product as FormProductEditFields);
    }
  };

  const handleCancelClick = () => {
    if (product !== null) {
      navigate(`/category/${product.category}`);
    }
  };

  const handleFormSubmit = (data: FormProductEditFields): void => {
    if (product !== null) {
      setSubmitting(true);

      const productToUpdate: IProduct = { ...product, ...data };

      ProductDS.updateOrCreate(productToUpdate)
        .then((response) => {
          const updatedProduct: IProduct = response.data;
          console.log("Product updated", updatedProduct);
          navigate(`/category/${productToUpdate.category}`);
        })
        .catch((err) => {
          console.log(
            "ERROR: An error occurred while product updating",
            err,
            err.response
          );
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Modifier le produit
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(handleFormSubmit)}
        sx={{ mt: 1, width: "100%" }}
      >
        <FormTextField
          autoComplete="code"
          autoFocus
          disabled={product === null}
          errorText={errors.code?.message}
          InputLabelProps={{ shrink: true }}
          label={"Code"}
          margin="normal"
          registerReturn={register("code")}
        />
        <FormTextField
          autoComplete="name"
          disabled={product === null}
          errorText={errors.name?.message}
          InputLabelProps={{ shrink: true }}
          label={"Nom"}
          margin="normal"
          registerReturn={register("name")}
        />
        {product !== null && (
          <FormSelect
            disabled={product === null}
            label={"Catégorie"}
            onChange={handleCategoryChange}
            options={categoryMenuItems}
            sx={{ fontSize: "0.95rem" }}
            value={product?.category.toString()}
          />
        )}
        <Button
          color="secondary"
          onClick={handleCancelClick}
          sx={{ mb: 2, mt: 3, mr: 3 }}
          type="button"
          variant="contained"
        >
          Annuler
        </Button>
        <Button
          color="primary"
          sx={{ mb: 2, mt: 3 }}
          type="submit"
          variant="contained"
        >
          Modifier
        </Button>
      </Box>
      <ProgressBackdrop open={submitting} />
    </>
  );
}

export default ProductEdit;
