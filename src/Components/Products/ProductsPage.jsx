import React, { useEffect, useState } from "react";
import axios from "../../Api/axios";
import Product from "./Product";
import { Grid, CircularProgress, Box } from "@mui/material";
const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);

  const getProducts = async () => {
    const result = await axios.get("/products/?categoryId=2");
    setProducts(result.data);
    if (result) {
      setLoader(false);
    } else {
      setLoader(true);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getProductData = (item) => {
    localStorage.setItem("product", JSON.stringify(item));
  };

  return (
    <>
      {loader ? (
        <Box
          display="flex"
          width="100%"
          height="calc(100vh - 84.5px)"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      ) : (
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
      )}
    </>
  );
};

export default ProductsPage;
