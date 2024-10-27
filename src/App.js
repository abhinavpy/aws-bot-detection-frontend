// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart'; // Import Cart component
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Update the theme in App.js
const theme = createTheme({
  palette: {
    primary: {
      main: '#ff9900', // Amazon Orange
    },
    secondary: {
      main: '#232f3e', // Amazon Dark Blue
    },
    background: {
      default: '#f3f3f3', // Light background
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} /> {/* New cart route */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
