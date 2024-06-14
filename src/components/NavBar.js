import React from 'react'
import { Link } from 'react-router-dom'; 
import PaidIcon from '@mui/icons-material/Paid';
import Button from '@mui/material/Button';



export const NavBar = ({ handleLogout, scrollToMetrics, back, rAction, lAction, header }) => {
  return (

    <div className="NavBar">
            <Link to={lAction} style={{ textDecoration: 'none' }}>
    <Button onClick={scrollToMetrics} variant="contained" sx={{ color: 'black', bgcolor: '#AA947E', '&:hover': { bgcolor: 'grey' } }}>Metrics</Button>  
    </Link>
    <h3 style={{ fontSize: '2rem', whiteSpace: 'nowrap', color: 'black' }}><PaidIcon className="paid-icon-large" fontSize="large"  style={{ verticalAlign: 'middle', marginBottom: '5px' }}/> {header}</h3>
    <Link to={rAction} style={{ textDecoration: 'none' }}>

    <Button onClick={handleLogout} variant="contained" sx={{ color: 'black', bgcolor: '#AA947E', '&:hover': { bgcolor: 'grey' } }}>{back}</Button>

    </Link>
    </div> 
  )
}
