import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

export const InputForm = ({ title, description, input }) => {
    const [age, setAge] = useState(input); // Initialize state with a starting value of 25

    const handleAgeChange = (event) => {
      setAge(event.target.value); // Update the state when the input value changes
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

        <TextField id="outlined-basic"  variant="outlined" value={age} onChange={handleAgeChange} sx={{ '& label.Mui-focused': { color: 'black' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'black' }, '&:hover fieldset': { borderColor: 'black' }, '&.Mui-focused fieldset': { borderColor: 'black' }, },'& input': { textAlign: 'right' }, width: '150px',fontSize: '1.2rem', }}/>
    </div>
  )
}
