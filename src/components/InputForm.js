import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

export const InputForm = ({ title, description, input, setInput }) => {
    const [holder, setHolder] = useState(input); // Initialize state with a starting value of 25

    const handleHolderChange = (event) => {
        const newValue = event.target.value;
        setHolder(newValue); // Update the local state when the input value changes
        setInput(newValue);  // Update the PARENT STATE
    };


// Check if input is passed through
if (input === undefined) {
    return (
        <div className='InputForm'>
        <div className='FormLabel'>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
        </div>
    );
    }

  return (

    <div className='InputForm'>
        <div className='FormLabel'>
        <h2>{title}</h2>
        <p>{description}</p>
        </div>

        <TextField id="outlined-basic"  variant="outlined" value={holder} onChange={handleHolderChange} sx={{ '& label.Mui-focused': { color: 'black' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'black' }, '&:hover fieldset': { borderColor: 'black' }, '&.Mui-focused fieldset': { borderColor: 'black' }, },'& input': { textAlign: 'right' }, width: '150px',fontSize: '1.2rem', }}/>
    </div>
  )
}
