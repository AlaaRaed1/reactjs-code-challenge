import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Stack,
  Paper,
  CircularProgress,
  Box,
} from "@mui/material";
const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("product"));
    setProduct(data);
    if (data) {
      setLoader(false);
    } else {
      setLoader(true);
    }
  }, []);

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
        <Paper
          sx={{
            display: "flex ",
            justifyContent: "center",
            height: "300px",
            width: "90%",
            maxWidth: "700px",
          }}
          id="paper"
        >
          <Grid
            container
            direction="row"
            wrap="nowrap"
            width="100%"
            gap={4}
            margin={0}
            id="product_details_grid"
          >
            <Grid
              item
              xs={12}
              sm={12}
              style={{ padding: "0", width: "40%", display: "flex" }}
              id="img_grid"
            >
              <img
                src={product.images}
                alt="Product"
                style={{
                  objectFit: "cover",
                  borderRadius: "6px",
                  maxWidth: "100%",
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              style={{ padding: "1em", maxWidth: "60%" }}
              id="info_grid"
            >
              <Stack spacing={2}>
                <Typography variant="h5" fontSize={24}>
                  {product.title}
                </Typography>
                <Typography variant="h6" fontSize={18} color="#1976d2">
                  {product.price}$
                </Typography>
              </Stack>
              <Stack
                component="div"
                sx={{ display: "flex", alignItems: "flex-end", height: "60%" }}
              >
                <Typography
                  variant="div"
                  fontSize={16}
                  sx={{ marginTop: "auto" }}
                >
                  {product.description}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default ProductDetails;
