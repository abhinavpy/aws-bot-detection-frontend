// src/components/Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from '@mui/material';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [actions, setActions] = useState([]);
  const navigate = useNavigate();

  // Track user interactions
  useEffect(() => {
    const handleMouseMove = (event) => {
      setActions((prev) => [...prev, { type: 'mousemove', x: event.clientX, y: event.clientY }]);
    };

    const handleKeyPress = (event) => {
      setActions((prev) => [...prev, { type: 'keypress', key: event.key }]);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keypress', handleKeyPress);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple bot detection logic
    if (isBot(actions)) {
      alert('Bot behavior detected! Please use a regular browser.');
      return; // Prevent login if bot is detected
    }
    
    if (username === 'abc' && password === 'xyz') {
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  const isBot = (actions) => {
    const keypressCount = actions.filter(action => action.type === 'keypress').length;
    const mouseMoves = actions.filter(action => action.type === 'mousemove').length;

    // Set thresholds (these are just examples, adjust as necessary)
    if (keypressCount > 20 && mouseMoves < 50) {
      return true; // Considered a bot
    }

    return false; // Considered a user
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" align="center" color="primary" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
