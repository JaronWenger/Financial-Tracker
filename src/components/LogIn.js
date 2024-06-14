import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { NavBar } from './NavBar';
import axios from 'axios';


export const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State to track error messages
  const navigate = useNavigate(); // Hook to navigate between routes

const onSubmit = async (event) => {
  event.preventDefault();
  try {
    console.log('Submitting login request...');
    const response = await axios.post('http://localhost:3001/api/user/login', { username, password }, { withCredentials: true });
    console.log('Login response:', response);
    // Check if the login was successful and redirect if it was
    if (response.status === 200) {
                // Set userId cookie with user ID from response
                //Cookies.set('userId', response.data.userId, { expires: 7, secure: true, sameSite: 'lax' }); // Adjust expires and other options as needed
    
      navigate('/profile');
    } else {
      setError('Login failed. Please check your credentials and try again.');
    }
  } catch (error) {
    console.error('Login failed', error);
    setError('Login failed. Please check your credentials and try again.');
  }
};

  return (
    <div className="container">
      <NavBar back="Home" rAction="/" lAction="/" header="Golden Metrics"/>
      <form className="form-container" onSubmit={onSubmit}>
        <h2>Log In</h2>
        {error && (
          <div style={{ color: 'red', padding: '5px', border: '1px solid red' }}>
            {error} {/* Display error message */}
          </div>
        )}
        <TextField
          label="Email"
          variant="outlined"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'black' },
              '&:hover fieldset': { borderColor: 'black' },
              '&.Mui-focused fieldset': { borderColor: 'black' }
            },
            '& .MuiInputLabel-root': { color: 'black' },
            '& .MuiInputLabel-root.Mui-focused': { color: 'black' }
          }}
        />
        <TextField
          label="Password"
          variant="outlined"

          value={password}
          onChange={(event) => setPassword(event.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'black' },
              '&:hover fieldset': { borderColor: 'black' },
              '&.Mui-focused fieldset': { borderColor: 'black' }
            },
            '& .MuiInputLabel-root': { color: 'black' },
            '& .MuiInputLabel-root.Mui-focused': { color: 'black' }
          }}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{
            bgcolor: 'black',
            color: 'white',
            '&:hover': { bgcolor: 'grey' },
            '&:active': { bgcolor: 'black' }
          }}
        >
          Sign In
        </Button>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
          {/* Applying flexbox */}
          <Button variant="text" onClick={() => navigate('/signup')} sx={{ color: 'black', '&:hover': { bgcolor: 'lightgrey' } }}>
            Create Account
          </Button>
          <Button variant="text" type="button" onClick={() => navigate('/reset')} sx={{ color: 'black', '&:hover': { bgcolor: 'lightgrey' } }}>
            Forgot Password
          </Button>
        </div>
      </form>
    </div>
  );
};
