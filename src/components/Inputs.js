import React from 'react'
import { InputForm } from './InputForm';
import Button from '@mui/material/Button';
import { InvestmentForm } from './InvestmentForm';
import { SwitchForm } from './SwitchForm';
import CircleButton from './CircleButton';


export const Inputs = ({ age, setAge, annualIncome, setAnnualIncome, annualExpenses, setAnnualExpenses, currentNetWorth, setCurrentNetWorth, handleCalculate, isMonthly, toggleFrequency }) => {




  return (
    <div className='Table'>

    <div className='PlaceHolder'/>

    <InputForm title="Age" description="The age you are today." input={age} setInput={setAge} />

    <div className='PlaceHolder'/>

    <SwitchForm isMonthly={isMonthly} toggleFrequency={toggleFrequency}/>

    <InputForm       title={isMonthly ? "Monthly Income" : "Annual Income"} description="Household income after taxes." input={annualIncome} setInput={setAnnualIncome} />


    <div className='PlaceHolder'/>

    <InputForm         title={isMonthly ? "Monthly Expenses" : "Annual Expenses"} description="Your current cost-of-living" input={annualExpenses} setInput={setAnnualExpenses} />
  

    <hr style={{ border: 'none', backgroundColor: 'black', height: '2px', width: '90%', marginTop: '2rem' }} />

    <div className='PlaceHolder'/>

    <InputForm title="Current Net Worth" description="The current value of all assets, minus the total of all liabilities." input={currentNetWorth} setInput={setCurrentNetWorth} />

    
    <hr style={{ border: 'none', backgroundColor: 'black', height: '2px', width: '90%', marginTop: '2rem' }} />

    <div className='PlaceHolder'/>

    <InputForm title="Asset Allocation %" description="Diversity of your investments." />
    <InvestmentForm stocksInput={80} bondsInput={15} cashInput={5}/>

    <div className='PlaceHolder'/>

    <InputForm title="Expected Rate of Return" description="Subtract inflation from rate of return." />
    <InvestmentForm stocksInput={5} bondsInput={2} cashInput={-3}/>


    <Button onClick={handleCalculate} variant="contained" sx={{ color: 'black', bgcolor: '#AA947E', '&:hover': { bgcolor: 'grey' }, minWidth: '30vw', alignContent: "center", margin: '0 auto', marginTop: "4rem", marginBottom: "2rem",     display: 'block' }}>Calculate</Button>  


    </div>
  )
}
