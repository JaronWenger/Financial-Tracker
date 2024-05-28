import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

export const InvestmentForm = ({ stocksInput, bondsInput, cashInput }) => {
    const [stocks, setStocks] = useState(stocksInput); 
    const [bonds, setBonds] = useState(bondsInput); 
    const [cash, setCash] = useState(cashInput); 

    const handleStocksChange = (event) => {
      setStocks(event.target.value); // Update the state when the input value changes
    };
    const handleBondsChange = (event) => {
    setBonds(event.target.value); // Update the state when the input value changes
    };
    const handleCashChange = (event) => {
    setCash(event.target.value); // Update the state when the input value changes
    };


  return (

    <div className='InvestmentForm'>

        <TextField id="stock-input" label="stocks" variant="outlined" value={stocks} onChange={handleStocksChange} sx={{ '& label.Mui-focused': { color: 'black' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'black' }, '&:hover fieldset': { borderColor: 'black' }, '&.Mui-focused fieldset': { borderColor: 'black' }, },'& input': { textAlign: 'right' }, width: '100px',fontSize: '1.2rem', }}/>
        <TextField id="bonds-input" label="bonds" variant="outlined" value={bonds} onChange={handleBondsChange} sx={{ '& label.Mui-focused': { color: 'black' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'black' }, '&:hover fieldset': { borderColor: 'black' }, '&.Mui-focused fieldset': { borderColor: 'black' }, },'& input': { textAlign: 'right' }, width: '100px',fontSize: '1.2rem', }}/>
        <TextField id="cash-input" label="cash" variant="outlined" value={cash} onChange={handleCashChange} sx={{ '& label.Mui-focused': { color: 'black' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'black' }, '&:hover fieldset': { borderColor: 'black' }, '&.Mui-focused fieldset': { borderColor: 'black' }, },'& input': { textAlign: 'right' }, width: '100px',fontSize: '1.2rem', }}/>
    
    </div>
  )
}
