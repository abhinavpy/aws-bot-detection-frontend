// src/components/ProductDetails.js

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import {
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Rating,
  TextField,
  Box,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h5" color="error">
          Product not found.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/dashboard')}
      >
        Back to Dashboard
      </Button>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', maxHeight: 400, objectFit: 'contain' }}
          />
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" color="primary" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h6" color="secondary" gutterBottom>
            {product.price}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.detailedDescription}
          </Typography>
          <Button variant="contained" color="primary" sx={{ mr: 2 }}>
            Add to Cart
          </Button>
          <Button variant="outlined" color="secondary">
            Buy Now
          </Button>
        </Grid>
      </Grid>

      {/* Reviews Section */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Customer Reviews
        </Typography>
        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <Paper key={index} sx={{ p: 2, mb: 2 }}>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Typography variant="subtitle1">
                    {review.username}
                  </Typography>
                </Grid>
                <Grid item>
                  <Rating
                    value={review.rating}
                    readOnly
                    precision={0.5}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(review.date).toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {review.comment}
              </Typography>
            </Paper>
          ))
        ) : (
          <Typography variant="body1">No reviews yet.</Typography>
        )}

        {/* Review Submission Form (Optional) */}
        <Paper sx={{ p: 2, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Write a Review
          </Typography>
          <Box component="form">
            <TextField
              label="Your Name"
              variant="outlined"
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <Rating
              name="rating"
              precision={0.5}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Your Review"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              required
              sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary">
              Submit Review
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default ProductDetails;
