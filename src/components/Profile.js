import { React, useState, useRef, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NavBar } from './NavBar';
import { Number } from './Number';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';

import { Inputs } from "./Inputs";
import { API_URL } from "../utils";

const apiUrl = API_URL
//const userId = '1'; // Replace with actual user ID

function Profile() {
  const navigate = useNavigate(); // Hook for navigation

  const [email, setEmail] = useState(null);
  const [userId, setUserId] = useState(null); // Initialize as null
  const [netWorth, setNetWorth] = useState(20000);  //defaults
  const [savingsRate, setSavingsRate] = useState(0.63);
  const [fireNumber, setFireNumber] = useState(750000);
  // ALL TEXT FIELDS BELOW
  const [age, setAge] = useState(35);
  const [annualIncome, setAnnualIncome] = useState(80000);
  const [annualExpenses, setAnnualExpenses] = useState(30000);
  const [currentNetWorth, setCurrentNetWorth] = useState(20000);
//Annualy v Monthly
  const [isYearly, setIsYearly] = useState(1);

  const metricsRef = useRef(null); // Create a ref for the Metrics section
  const adjustRef = useRef(null); // Create a ref for the Adjustments section

  const handleLogout = async () => {
    try {
      console.log('Logging out...'); // Add console log to track logout process
      const response = await axios.post(`${API_URL}/user/logout`, {}, { withCredentials: true });
      console.log('Logout response:', response.data); // Logs "Logout successful" if successful
  
      navigate('/login'); // Redirect to the login page
    } catch (error) {
      console.error('Logout failed', error);
      // Handle logout failure if needed
    }
  };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//function to fetch user data from the backend
const fetchUserData = async (userId) => {
  try {
    const response = await fetch(`${apiUrl}/user/${userId}`);
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

//function to update user data on the backend
const updateUserData = async (userId, newData) => {
  try {
    const response = await fetch(`${apiUrl}/user/${userId}`, {
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
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

///////////////////////////BACKEND CONNECTION//////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
useEffect(() => {
  const fetchUserId = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/getUserId`, { withCredentials: true });
      console.log('Fetched userId:', response.data.userId); // Ensure userId is fetched correctly
      setUserId(response.data.userId); // Assuming response.data contains userId
    } catch (error) {
      console.error('Failed to fetch userId:', error);
      // Handle error (e.g., redirect to login page or show an error message)
    }
  };

  fetchUserId();
}, []);

useEffect(() => {
  // Fetch user data when userId changes
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
      setIsYearly(userData.YM);
      setEmail(userData.username);
    }
  };

  if (userId !== null) {
    fetchData();
  }
}, [userId]); // Include userId as a dependency


///////////////////////////////////////////////////////////////////////////

const handleCalculate = async () => {  // Calculate new values
  const updatedNetWorth = currentNetWorth;
  const updatedSavingsRate = (annualIncome - annualExpenses) / annualIncome;
  const annualExpensesValue = isYearly === 0 ? annualExpenses * 12 : annualExpenses;
  const updatedFireNumber = annualExpensesValue / 0.04;



  // Update state with new values
  setNetWorth(updatedNetWorth);
  setSavingsRate(updatedSavingsRate);
  setFireNumber(updatedFireNumber);



  // Construct new data with updated values
  const newData = {
    netWorth: updatedNetWorth,
    savingsRate: updatedSavingsRate,
    fireNumber: updatedFireNumber,
    age: age,
    annualIncome: annualIncome,
    annualExpenses: annualExpenses,
    currentNetWorth: currentNetWorth,
    YM: isYearly // Update YM based on isYearly state
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
///////////////////////////////////////////////////////////////////////////




  //Switch Annualy and Monthly
//Switch Annualy and Monthly
const toggleFrequency = () => {
  console.log("Before:", isYearly);
  setAnnualIncome(prevIncome => (isYearly === 0 ? prevIncome * 12 : prevIncome / 12));
  setAnnualExpenses(prevExpenses => (isYearly === 0 ? prevExpenses * 12 : prevExpenses / 12));
  setIsYearly(prevState => (prevState === 1 ? 0 : 1)); // Change this to setisYearly(prevState => (prevState === 1 ? 0 : 1));
  console.log("After:", isYearly);
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

          <NavBar scrollToMetrics={handleLogout} handleLogout={handleLogout} back="Logout" rAction="/logout" lAction="/logout" header={email}/>

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

export default Profile;
