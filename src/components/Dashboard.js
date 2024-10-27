// src/components/Dashboard.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function Dashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');

  // Handle logout action
  const handleLogout = () => {
    navigate('/');
  };

  // Handle sorting option change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'priceLowHigh') {
      return parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1));
    } else if (sortOption === 'priceHighLow') {
      return parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1));
    } else if (sortOption === 'nameAZ') {
      return a.name.localeCompare(b.name);
    } else if (sortOption === 'nameZA') {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  return (
    <>
      {/* Navigation Bar */}
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
            E-commerce Platform
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" color="text.primary" gutterBottom>
          Product Dashboard
        </Typography>

        {/* Search Bar */}
        <TextField
          variant="outlined"
          placeholder="Search Products"
          fullWidth
          margin="normal"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />

        {/* Sorting Options */}
        <FormControl variant="outlined" sx={{ minWidth: 200, mb: 2 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortOption}
            onChange={handleSortChange}
            label="Sort By"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="priceLowHigh">Price: Low to High</MenuItem>
            <MenuItem value="priceHighLow">Price: High to Low</MenuItem>
            <MenuItem value="nameAZ">Name: A to Z</MenuItem>
            <MenuItem value="nameZA">Name: Z to A</MenuItem>
          </Select>
        </FormControl>

        {/* Product Grid */}
        <Grid container spacing={4}>
          {sortedProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Dashboard;
