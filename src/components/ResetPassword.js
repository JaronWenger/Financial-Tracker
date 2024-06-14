import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from 'react-router-dom';
import { NavBar } from './NavBar';

const ResetPassword = () => {
  const [step, setStep] = useState(1); // Step 1: Request reset, Step 2: Complete reset
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
  });

  const navigate = useNavigate(); // Hook for navigation

  // Function to handle password change and update requirements
  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setNewPassword(newPassword);
    setPasswordRequirements({
      length: newPassword.length >= 8,
      lowercase: /[a-z]/.test(newPassword),
      uppercase: /[A-Z]/.test(newPassword),
      number: /\d/.test(newPassword),
      special: /[@$!%*?&]/.test(newPassword),
    });
  };

  // Function to handle submission of reset code request
  const handleResetCodeRequest = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/reset-password/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStep(2); // Move to step 2: Complete reset
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to request reset code.');
      }
    } catch (error) {
      setError('Failed to request reset code. Please try again later.');
    }
  };

  // Function to handle submission of password reset
  const handlePasswordReset = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/reset-password/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, resetCode, newPassword }),
      });

      if (response.ok) {
        // Password reset successful, redirect to login or home
        navigate('/login');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to reset password.');
      }
    } catch (error) {
      setError('Failed to reset password. Please try again later.');
    }
  };

  return (
    <div className="container">
      <NavBar back="Home" rAction="/" lAction="/" header="Golden Metrics"/>
      <form className="form-container" onSubmit={step === 1 ? handleResetCodeRequest : handlePasswordReset}>
        {step === 1 ? (
          <div className="step-container">
            <h2>Request Password Reset</h2>
            {error && <div className="error-message">{error}</div>}
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'black' },
                  '&:hover fieldset': { borderColor: 'black' },
                  '&.Mui-focused fieldset': { borderColor: 'black' },
                },
                '& .MuiInputLabel-root': { color: 'black' },
                '& .MuiInputLabel-root.Mui-focused': { color: 'black' },
              }}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{
                bgcolor: 'black',
                color: 'white',
                '&:hover': { bgcolor: 'grey' },
                '&:active': { bgcolor: 'black' },
              }}
            >
              Request Reset Code
            </Button>
            <Button variant="text" onClick={() => navigate('/login')} sx={{ color: 'black', '&:hover': { bgcolor: 'lightgrey' } }}>
              Back
            </Button>
          </div>
        ) : (
          <div className="step-container">
            <h2>Reset Your Password</h2>
            {error && <div className="error-message">{error}</div>}
            <TextField
              label="Reset Code"
              variant="outlined"
              value={resetCode}
              onChange={(event) => setResetCode(event.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'black' },
                  '&:hover fieldset': { borderColor: 'black' },
                  '&.Mui-focused fieldset': { borderColor: 'black' },
                },
                '& .MuiInputLabel-root': { color: 'black' },
                '& .MuiInputLabel-root.Mui-focused': { color: 'black' },
              }}
            />
            <TextField
              label="New Password"
              variant="outlined"
              type="password"
              value={newPassword}
              onChange={handlePasswordChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'black' },
                  '&:hover fieldset': { borderColor: 'black' },
                  '&.Mui-focused fieldset': { borderColor: 'black' },
                },
                '& .MuiInputLabel-root': { color: 'black' },
                '& .MuiInputLabel-root.Mui-focused': { color: 'black' },
              }}
            />
            {newPassword && (
              <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column' }}>
                <FormControlLabel control={<Checkbox checked={passwordRequirements.length} disabled />} label="8 Characters" />
                <FormControlLabel control={<Checkbox checked={passwordRequirements.lowercase} disabled />} label="Lowercase letter" />
                <FormControlLabel control={<Checkbox checked={passwordRequirements.uppercase} disabled />} label="Uppercase letter" />
                <FormControlLabel control={<Checkbox checked={passwordRequirements.number} disabled />} label="Number" />
                <FormControlLabel control={<Checkbox checked={passwordRequirements.special} disabled />} label="Special symbol" />
              </div>
            )}
            <Button variant="contained" type="submit"               sx={{
                bgcolor: 'black',
                color: 'white',
                '&:hover': { bgcolor: 'grey' },
                '&:active': { bgcolor: 'black' },
              }}>
              Reset Password
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
