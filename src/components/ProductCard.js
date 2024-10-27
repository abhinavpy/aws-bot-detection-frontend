// src/components/ProductCard.js

import React, { useState, useContext } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { logActivity } from '../utils/activityLogger';

function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useContext(CartContext);

  const defaultImage =
    'https://via.placeholder.com/200x200.png?text=No+Image+Available';

  return (
    <Card sx={{ maxWidth: 345, margin: 'auto' }}>
      <CardMedia
        component="img"
        height="200"
        image={imageError ? defaultImage : product.image}
        alt={product.name}
        onError={() => setImageError(true)}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          color="primary"
        >
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h6" color="secondary" sx={{ mt: 1 }}>
          {product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          color="primary"
          component={RouterLink}
          to={`/product/${product.id}`}
          onClick={() =>
            logActivity('VIEW_PRODUCT', { productId: product.id })
          }
        >
          View Product
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          onClick={() => {
            addToCart(product);
            logActivity('ADD_TO_CART', { productId: product.id });
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
