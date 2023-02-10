import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
const Product = ({ product, getProductData }) => {
  const { images, title, price, description } = product;
  return (
    <Grid item xs={6} sm={4} md={3}>
      <Card
        sx={{
          height: "300px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia component="img" height="120" image={images[0]} />
        <CardContent>
          <Typography variant="h5" fontSize={14}>
            {title}
          </Typography>
          <Typography variant="h6" fontSize={12}>
            {"$" + price}
          </Typography>
          <Typography variant="p" fontSize={10} className="product_desc">
            {description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ display: "flex", alignItems: "flex-end", height: "100%" }}
        >
          <Button
            variant="success"
            size="small"
            onClick={() => {
              getProductData(product);
            }}
          >
            <Link
              to="/productDetails"
              style={{ textDecoration: "unset", color: "#1976d2" }}
            >
              See Product
            </Link>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Product;
