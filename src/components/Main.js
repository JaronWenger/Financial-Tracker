import React, { useState, useRef } from "react";
import { Number } from './Number';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Inputs } from "./Inputs";
import { NavBar } from "./NavBar";

function Main() {
  const [netWorth, setNetWorth] = useState(20000);  //defaults
  const [savingsRate, setSavingsRate] = useState(0.63);
  const [fireNumber, setFireNumber] = useState(750000);
  const [age, setAge] = useState(35);
  const [annualIncome, setAnnualIncome] = useState(80000);
  const [annualExpenses, setAnnualExpenses] = useState(30000);
  const [currentNetWorth, setCurrentNetWorth] = useState(20000);
  const [isYearly, setIsYearly] = useState(1);

  const metricsRef = useRef(null); // Create a ref for the Metrics section
  const adjustRef = useRef(null); // Create a ref for the Adjustments section

  const handleCalculate = () => {  // Calculate new values
    const updatedNetWorth = currentNetWorth;
    const updatedSavingsRate = (annualIncome - annualExpenses) / annualIncome;
    const annualExpensesValue = isYearly === 0 ? annualExpenses * 12 : annualExpenses;
    const updatedFireNumber = annualExpensesValue / 0.04;

    // Update state with new values
    setNetWorth(updatedNetWorth);
    setSavingsRate(updatedSavingsRate);
    setFireNumber(updatedFireNumber);

    // Scroll to the metrics section
    scrollToMetrics();
  };

  const toggleFrequency = () => {
    setAnnualIncome(prevIncome => (isYearly === 0 ? prevIncome * 12 : prevIncome / 12));
    setAnnualExpenses(prevExpenses => (isYearly === 0 ? prevExpenses * 12 : prevExpenses / 12));
    setIsYearly(prevState => (prevState === 1 ? 0 : 1));
  };

  const scrollToMetrics = () => {
    metricsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAdjustments = () => {
    adjustRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const theme = createTheme({
    palette: {
      mode: 'light', // Set the mode to 'light'
      background: {
        default: '#AA947E', // Light mode background color
      },
    },
    typography: {
      fontFamily: 'Lexend, Arial, sans-serif',
      h6: {
        fontWeight: 700,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <div className="Background">
          <NavBar scrollToMetrics={scrollToMetrics} back="Login" rAction="/login" header="Golden Metrics"/>
          <div className="Content">
            <h2 className="title" style={{ whiteSpace: 'nowrap', color: 'black', paddingTop: '4.5rem' }}>Track your finances</h2>
            <h2 className="title" style={{ whiteSpace: 'nowrap', color: 'black', paddingBottom: '2rem' }}>with ease.</h2>
            <div className="ButtonContainer">
              <Button onClick={scrollToMetrics} className="small-button" variant="outlined" sx={{ color: 'black', borderColor: 'black', '&:hover': { bgcolor: '#AA947E', borderColor: '#AA947E', color: 'white' } }}>Metrics</Button>
            </div>
          </div>
        </div>

        {/* Invisible helper div for scrolling */}
        <div ref={metricsRef} style={{ position: 'relative', top: '-50px' }}></div>

        <div className="NumberCards">
          <div className="NumberCard">
            <Number label="Net Worth" value={netWorth} dataType="money" more="Net worth is the value of assets minus liabilities, indicating an individual's financial standing by showcasing the difference between what they own and what they owe." scrollToAdjustments={scrollToAdjustments}/>
          </div>
          <div className="NumberCard">
            <Number label="Savings Rate" value={savingsRate} dataType="percent" more="The savings rate represents the portion of income that a person saves rather than spends. It reflects the proportion of earnings set aside for future use or investment." scrollToAdjustments={scrollToAdjustments}/>
          </div>
          <div className="NumberCard">
            <Number label="FIRE #" value={fireNumber} dataType="money" more="The Fire Number, based on the 4% rule, represents the total savings needed for retirement. It ensures sustainable income to maintain desired lifestyle post-retirement." scrollToAdjustments={scrollToAdjustments}/>
          </div>
        </div>

        {/* Invisible helper div for scrolling */}
        <div ref={adjustRef} style={{ position: 'relative' }}></div>

        <div className="Inputs">
          <Inputs
            age={age} setAge={setAge}
            annualIncome={annualIncome} setAnnualIncome={setAnnualIncome}
            annualExpenses={annualExpenses} setAnnualExpenses={setAnnualExpenses}
            currentNetWorth={currentNetWorth} setCurrentNetWorth={setCurrentNetWorth}
            handleCalculate={handleCalculate}
            isMonthly={isYearly}
            toggleFrequency={toggleFrequency}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Main;
