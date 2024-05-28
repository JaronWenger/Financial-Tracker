import React from 'react'
import { InputForm } from './InputForm';
import Button from '@mui/material/Button';
import { InvestmentForm } from './InvestmentForm';

export const Inputs = ({ age, setAge, annualIncome, setAnnualIncome, annualExpenses, setAnnualExpenses, currentNetWorth, setCurrentNetWorth, updateNetWorthToCurrent  }) => {



  return (
    <div className='Table'>


    <InputForm title="Age" description="The age you are today." input={age} setInput={setAge} />

    <InputForm title="Annual Income" description="Household income after taxes." input={annualIncome} setInput={setAnnualIncome} />

    <InputForm title="Annual Expenses" description="The age you are today." input={annualExpenses} setInput={setAnnualExpenses} />


    <hr style={{ border: 'none', backgroundColor: 'black', height: '2px', width: '90%', marginTop: '3rem' }} />

    <InputForm title="Current Net Worth" description="The current value of all assets, minus the total of all liabilities." input={currentNetWorth} setInput={setCurrentNetWorth} />

    <hr style={{ border: 'none', backgroundColor: 'black', height: '2px', width: '90%', marginTop: '3rem' }} />

    <InputForm title="Asset Allocation %" description="Diversity of your investments." />
    <InvestmentForm stocksInput={80} bondsInput={15} cashInput={5}/>

    <InputForm title="Expected Rate of Return" description="Subtract inflation from rate of return." />
    <InvestmentForm stocksInput={5} bondsInput={2} cashInput={-3}/>


    <Button onClick={updateNetWorthToCurrent} variant="contained" sx={{ color: 'black', bgcolor: '#AA947E', '&:hover': { bgcolor: 'grey' }, minWidth: '30vw', alignContent: "center", margin: '0 auto', marginTop: "4rem", marginBottom: "2rem",     display: 'block' }}>Calculate</Button>  


    </div>
  )
}
