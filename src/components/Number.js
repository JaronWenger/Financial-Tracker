import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';

export const Number = ({ label, value, more }) => {
  const valueRef = useRef();
  const [fontSize, setFontSize] = useState('6rem');


  useEffect(() => {
    const adjustFontSize = () => {
      if (valueRef.current) {
        const length = value.toString().length;
        // Base font size of 4rem, decrease slightly for each additional digit
        const newFontSize = `${6 - Math.min((length - 1) * 0.3, 3)}rem`;
        setFontSize(newFontSize);
      }
    };

    adjustFontSize();
  }, [value]);

  return (
    <div>
      <div className='TopBox' ref={valueRef} style={{ fontSize }}>
        {value}
      </div>
      <div className='Label'>
      {label}
      </div>

      <div className='Description'>
        {more}

      </div>

      <div className='CardButton'>
      <Button variant="contained" sx={{ color: 'black', bgcolor: '#AA947E', '&:hover': { bgcolor: 'grey' } }}>Adjust</Button>
      </div>
      
      
      
    </div>
  )
}
