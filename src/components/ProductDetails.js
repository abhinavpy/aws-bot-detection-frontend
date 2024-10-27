// src/components/ProductDetails.js

import React, { useState, useEffect, useContext } from 'react';
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
import { CartContext } from '../context/CartContext';
import { logActivity } from '../utils/activityLogger';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));

  const { addToCart } = useContext(CartContext);

  // **Move Hooks to the Top Level**

  // State for the reviews
  const [reviews, setReviews] = useState(product ? product.reviews || [] : []);

  // State for the review form
  const [reviewForm, setReviewForm] = useState({
    username: '',
    rating: 0,
    comment: '',
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewForm({ ...reviewForm, [name]: value });
  };

  // Handle rating change
  const handleRatingChange = (event, newValue) => {
    setReviewForm({ ...reviewForm, rating: newValue });
  };

  // Handle form submission
  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (
      !reviewForm.username ||
      !reviewForm.comment ||
      reviewForm.rating === 0
    ) {
      alert('Please fill in all fields and provide a rating.');
      return;
    }

    const newReview = {
      username: reviewForm.username,
      rating: reviewForm.rating,
      comment: reviewForm.comment,
      date: new Date().toISOString().split('T')[0],
    };

    setReviews([newReview, ...reviews]); // Add new review to the top
    setReviewForm({
      username: '',
      rating: 0,
      comment: '',
    });
    alert('Review submitted!');
    if (product) {
      logActivity('SUBMIT_REVIEW', { productId: product.id });
    }
  };

  // Log product view
  useEffect(() => {
    if (product) {
      logActivity('PRODUCT_VIEW', { productId: product.id });
    }
  }, [product]);

  // **Conditional Rendering After Hooks**
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
            style={{
              width: '100%',
              maxHeight: 400,
              objectFit: 'contain',
            }}
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
          <Button
            variant="contained"
            color="primary"
            sx={{ mr: 2 }}
            onClick={() => {
              addToCart(product);
              logActivity('ADD_TO_CART', { productId: product.id });
              alert('Product added to cart!');
            }}
          >
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
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <Paper key={index} sx={{ p: 2, mb: 2 }}>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Typography variant="subtitle1">
                    {review.username}
                  </Typography>
                </Grid>
                <Grid item>
                  <Rating value={review.rating} readOnly precision={0.5} />
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

        {/* Review Submission Form */}
        <Paper sx={{ p: 2, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Write a Review
          </Typography>
          <Box component="form" onSubmit={handleSubmitReview}>
            <TextField
              label="Your Name"
              variant="outlined"
              fullWidth
              required
              sx={{ mb: 2 }}
              name="username"
              value={reviewForm.username}
              onChange={handleInputChange}
            />
            <Rating
              name="rating"
              precision={0.5}
              value={reviewForm.rating}
              onChange={handleRatingChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Your Review"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              required
              name="comment"
              value={reviewForm.comment}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary" type="submit">
              Submit Review
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default ProductDetails;
