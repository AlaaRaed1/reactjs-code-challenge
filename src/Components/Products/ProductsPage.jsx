import React, { useEffect, useState } from "react";
import axios from "../../Api/axios";
import Product from "./Product";
import { Grid } from "@mui/material";
const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const result = await axios.get("/products/?categoryId=2");
    setProducts(result.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getProductData = (item) => {
    localStorage.setItem("product", JSON.stringify(item));
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{ width: "100%", paddingInline: "1em" }}
      justifyContent="center"
    >
      {products.map((item, i) => {
        return (
          <Product product={item} getProductData={getProductData} key={i} />
        );
      })}
    </Grid>
  );
};

export default ProductsPage;
