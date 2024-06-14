import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from 'react-router-dom'; 
import { NavBar } from './NavBar';
import axios from 'axios';



export const SignUp = ({ onSwitchToLogin }) => {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [error, setError] = useState(null); // State to track error messages

        const navigate = useNavigate();
        const [passwordRequirements, setPasswordRequirements] = useState({
            length: false,
            lowercase: false,
            uppercase: false,
            number: false,
            special: false,
        });

        // Define a custom password validation function
        const isPasswordValid = (password) => {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            return passwordRegex.test(password);
        };

        const handlePasswordChange = (event) => {
            const newPassword = event.target.value;
            setPassword(newPassword);
    
            // Update password requirements
            setPasswordRequirements({
                length: newPassword.length >= 8,
                lowercase: /[a-z]/.test(newPassword),
                uppercase: /[A-Z]/.test(newPassword),
                number: /\d/.test(newPassword),
                special: /[@$!%*?&]/.test(newPassword),
            });
        };

        const onSubmit = async (event) => {
            event.preventDefault();
          
            if (!email || !password) {
              setError('Email and password are required');
              return;
            }
          
            if (!isPasswordValid(password)) {
              setError(
                'Password should contain at least 8 characters, including lowercase letters, uppercase letters, numbers, and special symbols.'
              );
              return;
            }
          
            try {
              console.log('Sending signup request');
              const response = await axios.post(
                'http://localhost:3001/api/user/signup',
                { email, password },
                { withCredentials: true }
              );
          
              // Check response status directly
              if (response.status !== 201) {
                const data = response.data;
                throw new Error(data.error || 'Failed to sign up');
              }
          
              console.log('User signed up successfully');
              // Navigate to profile page
              navigate('/profile');
            } catch (error) {
              setError(error.message);
            }
          };
          
          


  return (
    <div className="container">
         <NavBar back="Home" rAction="/" lAction="/" header="Golden Metrics"/>
        <form className="form-container" onSubmit={onSubmit}>

            <h2>Create Account</h2>

            {error && (
            <div style={{ color: 'red', padding: '10px', border: '1px solid red' }}>
                {error} {/* Display error message */}
            </div>
            )}

            <TextField label="Email" variant="outlined" value={email} onChange = {(event) => setEmail(event.target.value)} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'black' }, '&:hover fieldset': { borderColor: 'black' }, '&.Mui-focused fieldset': { borderColor: 'black' } }, '& .MuiInputLabel-root': { color: 'black' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }} />

            <TextField label="Password" variant="outlined" value={password} onChange={handlePasswordChange} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'black' }, '&:hover fieldset': { borderColor: 'black' }, '&.Mui-focused fieldset': { borderColor: 'black' } }, '& .MuiInputLabel-root': { color: 'black' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }} />
            {password && ( // Only render if password is not empty
                    <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column' }}>
                        <div>
                            <FormControlLabel
                                control={<Checkbox checked={passwordRequirements.length} disabled />}
                                label="8 Characters"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                control={<Checkbox checked={passwordRequirements.lowercase} disabled />}
                                label="Lowercase letter"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                control={<Checkbox checked={passwordRequirements.uppercase} disabled />}
                                label="Uppercase letter"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                control={<Checkbox checked={passwordRequirements.number} disabled />}
                                label="Number"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                control={<Checkbox checked={passwordRequirements.special} disabled />}
                                label="Special symbol"
                            />
                        </div>
                    </div>
                )}

            <Button variant="contained" type="submit" sx={{ bgcolor: 'black', color: 'white', '&:hover': { bgcolor: 'grey' }, '&:active': { bgcolor: 'black' } }}>Create Account</Button>

            <Button variant="text" onClick={() => navigate('/login')} sx={{ color: 'black', '&:hover': { bgcolor: 'lightgrey' } }}>Log In</Button>

        </form>
    </div>
  )
}
