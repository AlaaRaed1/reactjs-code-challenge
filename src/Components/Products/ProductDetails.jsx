import React, { useEffect, useState } from "react";
import { Grid, Typography, Stack, Paper } from "@mui/material";
const ProductDetails = () => {
  const [product, setProduct] = useState({});
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("product"));
    setProduct(data);
  }, []);

  return (
    <Paper sx={{ display: "flex ", justifyContent: "center", padding: "1em" }}>
      <Grid
        container
        spacing={2}
        direction="row"
        wrap="nowrap"
        width="100%"
        margin={0}
      >
        <Grid item xs={12} sm={6} style={{ padding: "0" }}>
          <img
            src={product.images}
            alt="Product"
            width={120}
            height={150}
            style={{ objectFit: "cover", borderRadius: "6px" }}
          />
        </Grid>
        <Grid item xs={12} sm={6} style={{ padding: "0" }}>
          <Stack spacing={2}>
            <Typography variant="h5" fontSize={14}>
              {product.title}
            </Typography>
            <Typography variant="h6" fontSize={12}>
              {`Price: $${product.price}`}
            </Typography>
          </Stack>
          <Stack
            component="div"
            sx={{ display: "flex", alignItems: "flex-start", height: "80px" }}
          >
            <Typography variant="div" fontSize={10} sx={{ marginTop: "auto" }}>
              {product.description}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProductDetails;
