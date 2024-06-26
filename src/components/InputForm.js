import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';

export const InputForm = ({ title, description, input, setInput }) => {
    const initialValue = input ? Number(input) : ''; // Initialize state with a starting value of '' or a number if input is provided
    const [holder, setHolder] = useState(initialValue); // Initialize state with a starting value of ''
    const [isValidInput, setIsValidInput] = useState(true); // Initialize state to track if input is valid

        // Update the local state whenever the input prop changes
        useEffect(() => {
            if (input !== undefined) {
                setHolder(input.toString());
            }
        }, [input]);


    const handleHolderChange = (event) => {
        const newValue = event.target.value;
        if (!isNaN(newValue) || newValue === '') {
            setHolder(newValue); // Update the local state only if the entered value is numeric or empty
        }
    };

    const handleBlur = () => {
        if (!isNaN(holder)) {
            setInput(Number(holder)); // Update the parent state only if the value is a valid number
            setIsValidInput(true); // Mark input as valid
        } else {
            setIsValidInput(false); // Mark input as invalid if it's not a valid number
        }
    };

    const handleFocus = () => {
        setIsValidInput(true); // Mark input as valid when user focuses on the text field
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

    //DECIMAL MANAGEMENT
    const formattedValue = parseFloat(holder);

    // Check if formattedValue is a valid number
    const isValidNumber = !isNaN(formattedValue);
    
    // If formattedValue is a valid number, format it to display only two decimal places
    const displayValue = isValidNumber ? formattedValue.toFixed(2) : '';
    
    // Check if the displayValue has decimals
    const hasDecimals = displayValue.includes('.');
    
    // If displayValue has decimals, remove trailing zeros
    const trimmedValue = hasDecimals ? displayValue.replace(/0+$/, '').replace(/\.$/, '') : displayValue;
    

    return (
        <div className='InputForm'>
            <div className='FormLabel'>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
            <TextField
                id="outlined-basic"
                variant="outlined"
                value={trimmedValue}
                onChange={handleHolderChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                error={!isValidInput}
                helperText={!isValidInput ? 'Invalid input' : ''}
                sx={{
                    '& label.Mui-focused': { color: 'black' },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'black' },
                        '&:hover fieldset': { borderColor: 'black' },
                        '&.Mui-focused fieldset': { borderColor: 'black' },
                    },
                    '& input': { textAlign: 'right' },
                    width: '150px',
                    fontSize: '1.2rem',
                }}
            />
        </div>
    );
};
