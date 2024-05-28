import React from 'react'
import Button from '@mui/material/Button';

export const Number = ({ label, value, more }) => {
  return (
    <div>
      <div className='TopBox'>
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
