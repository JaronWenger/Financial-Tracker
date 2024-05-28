import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';

export const Number = ({ label, value, dataType, more }) => {
  const valueRef = useRef();
  const [fontSize, setFontSize] = useState('6rem');


    // Function to format money value
    const formatMoney = (val) => {
      return `$${val.toLocaleString('en-US')}`;
    };
  
    // Function to format percent value
    const formatPercent = (val) => {
      return `${(val * 100).toFixed(0)}%`;
    };
  
    // Format the value based on dataType
    let formattedValue;
    if (dataType === "money") {
      formattedValue = formatMoney(value);
    } else if (dataType === "percent") {
      formattedValue = formatPercent(value);
    } else {
      formattedValue = value;
    }

    

  useEffect(() => {
    const adjustFontSize = () => {
      if (valueRef.current) {
        const length = formattedValue.toString().length;
        // Base font size of 4rem, decrease slightly for each additional digit
        const newFontSize = `${6 - Math.min((length - 1) * 0.3, 3)}rem`;
        setFontSize(newFontSize);
      }
    };
    adjustFontSize();
  }, [formattedValue]);



  return (
    <div>
      <div className='TopBox' ref={valueRef} style={{ fontSize }}>
      {formattedValue}
      </div>
      <div className='Label'>
      {label}
      </div>

      <div className='Description'>
        {more}

      </div>

      <div className='CardButton' >
      <Button variant="contained" sx={{ color: 'black', bgcolor: '#AA947E', '&:hover': { bgcolor: 'grey' } }}>Adjust</Button>
      </div>
      
      
      
    </div>
  )
}
