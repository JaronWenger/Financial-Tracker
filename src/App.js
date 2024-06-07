import { React, useState, useRef, useEffect } from "react";
import { Number } from './components/Number';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import PaidIcon from '@mui/icons-material/Paid';
import { Inputs } from "./components/Inputs";

import { API_URL } from "./utils";
const apiUrl = API_URL
const userId = '1'; // Replace with actual user ID

// Example function to fetch user data from the backend
const fetchUserData = async (userId) => {
  try {
    const response = await fetch(`${apiUrl}/api/user/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Example function to update user data on the backend
const updateUserData = async (userId, newData) => {
  try {
    const response = await fetch(`${apiUrl}/api/user/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    });
    if (!response.ok) {
      throw new Error('Failed to update user data');
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};





function App() {
  const [netWorth, setNetWorth] = useState(20000);
  const [savingsRate, setSavingsRate] = useState(0.63);
  const [fireNumber, setFireNumber] = useState(750000);
  // ALL TEXT FIELDS BELOW
  const [age, setAge] = useState(35);
  const [annualIncome, setAnnualIncome] = useState(999);
  const [annualExpenses, setAnnualExpenses] = useState(30000);
  const [currentNetWorth, setCurrentNetWorth] = useState(20000);
//Annualy v Monthly
  const [isMonthly, setIsMonthly] = useState(false);

  const metricsRef = useRef(null); // Create a ref for the Metrics section
  const adjustRef = useRef(null); // Create a ref for the Adjustments section


  useEffect(() => {
    setIsMonthly(annualIncome < 10000 || annualExpenses < 10000); // Assuming yearly amounts are more than 10000
  }, [annualIncome, annualExpenses]);

///////////////////////////BACKEND CONNECTION//////////////////////////////

useEffect(() => {
  // Fetch user data when component mounts
  const fetchData = async () => {
    const userData = await fetchUserData(userId);
    if (userData) {
      setNetWorth(userData.netWorth);
      setSavingsRate(userData.savingsRate);
      setFireNumber(userData.fireNumber);
      setAge(userData.age);
      setAnnualIncome(userData.annualIncome);
      setAnnualExpenses(userData.annualExpenses);
      setCurrentNetWorth(userData.currentNetWorth);
    }
  };
  fetchData();
}, []);

///////////////////////////////////////////////////////////////////////////

const handleCalculate = async () => {
  // Update the net worth, savings rate, and fire number based on current values
  updateNetWorthToCurrent();
  updateSavingsRateToCurrent();
  updateFireNumberToCurrent();
  
  // Send updated user data to the backend
  const newData = {
    netWorth: netWorth,
    savingsRate: savingsRate,
    fireNumber: fireNumber,
    age: age,
    annualIncome: annualIncome,
    annualExpenses: annualExpenses,
    currentNetWorth: currentNetWorth
  };

  try {
    const result = await updateUserData(userId, newData);
    console.log('User data updated successfully:', result);
    // Scroll to the metrics section
    scrollToMetrics();
  } catch (error) {
    console.error('Failed to update user data:', error);
  }
};



  //NetWorthCalculator
  const updateNetWorthToCurrent = () => {
    setNetWorth(currentNetWorth);
  };
  //SavingsRateCalculator
  const updateSavingsRateToCurrent = () => {
    const newRate = (annualIncome - annualExpenses) / annualIncome;
    setSavingsRate(newRate);
  };
  //FireNumberCalculator
  const updateFireNumberToCurrent = () => {
    const annualExpensesValue = isMonthly ? annualExpenses * 12 : annualExpenses;
    const newFire = annualExpensesValue / 0.04;
    setFireNumber(newFire);
};
  //Switch Annualy and Monthly
  const toggleFrequency = () => {
    setAnnualIncome(prevIncome => isMonthly ? prevIncome * 12 : prevIncome / 12);
    setAnnualExpenses(prevExpenses => isMonthly ? prevExpenses * 12 : prevExpenses / 12);
    setIsMonthly(prevState => !prevState);
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


  const scrollToMetrics = () => {
    metricsRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToAdjustments = () => {
    adjustRef.current.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
          <div className="Background">
            <div className="NavBar">
              <Button onClick={scrollToMetrics} variant="contained" sx={{ color: 'black', bgcolor: '#AA947E', '&:hover': { bgcolor: 'grey' } }}>Metrics</Button>  
              <h3 style={{ fontSize: '2rem', whiteSpace: 'nowrap', color: 'black' }}><PaidIcon className="paid-icon-large" fontSize="large"  style={{ verticalAlign: 'middle', marginBottom: '5px' }}/> Golden Metrics</h3>
              <Button variant="contained" sx={{ color: 'black', bgcolor: '#AA947E', '&:hover': { bgcolor: 'grey' } }}>Login</Button>
            </div> 
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

            isMonthly={isMonthly}
            toggleFrequency={toggleFrequency}
            />
        </div>

      </div>
    </ThemeProvider>
  );
}

export default App;
