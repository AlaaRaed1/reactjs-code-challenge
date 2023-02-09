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
const Product = ({ product, getProductData }) => {
  const { images, title, price, desc } = product;
  return (
    <Grid item xs={6} sm={4} md={3}>
      <Card
        sx={{
          height: "300px",
          display: "flex",
          flexDirection: "column",
          //   justifyContent: "end",
        }}
      >
        <CardMedia
          component="img"
          height="120"
          image={images[Math.floor(Math.random() * 2)]}
        />
        <CardContent>
          <Typography variant="h5" fontSize={14}>
            {title}
          </Typography>
          <Typography variant="h6" fontSize={12}>
            {"$" + price}
          </Typography>
          <Typography variant="p" fontSize={10} className="product_desc">
            {desc}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => getProductData(product)}>
            See Product
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Product;
