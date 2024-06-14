import React, { useState, useContext } from 'react';




import { useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const ConfirmAccount = () => {
  const [confirmationCode, setConfirmationCode] = useState('');
  const [error, setError] = useState(null); // State for error messages
  const navigate = useNavigate(); // Hook for navigation



  const onConfirm = (event) => {
    event.preventDefault();


  };

  return (
    <div className="container">
      <form className="form-container" onSubmit={onConfirm}>
        <h2>Confirm Your Account</h2>

        {error && (
          <div style={{ color: 'red', padding: '10px', border: '1px solid red' }}>
            {error}
          </div>
        )}


        <TextField
          label="Confirmation Code"
          variant="outlined"
          value={confirmationCode}
          onChange={(event) => setConfirmationCode(event.target.value)}
        />

        <Button variant="contained" type="submit">Confirm Account</Button>
      </form>
    </div>
  );
};
