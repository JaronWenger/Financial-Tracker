import React from "react";
import { Number } from './components/Number';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import PaidIcon from '@mui/icons-material/Paid';


function App() {
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
          <div className="NavBar">
            <Button variant="contained" sx={{ color: 'black', bgcolor: '#AA947E', '&:hover': { bgcolor: 'grey' } }}>Metrics</Button>  
            <h3 style={{ fontSize: '2rem', whiteSpace: 'nowrap', color: 'black' }}><PaidIcon fontSize="large"  style={{ verticalAlign: 'middle', marginBottom: '5px' }}/> Financial Tracker</h3>
            <Button variant="contained" sx={{ color: 'black', bgcolor: '#AA947E', '&:hover': { bgcolor: 'grey' } }}>Login</Button>
          </div> 
          <div className="Content">
          <h2 className="title" style={{ whiteSpace: 'nowrap', color: 'black', paddingTop: '4.5rem' }}>Track your finances</h2>
          <h2 className="title" style={{ whiteSpace: 'nowrap', color: 'black', paddingBottom: '2rem' }}>with ease.</h2>
          <div className="ButtonContainer">
          <Button className="small-button" variant="outlined" sx={{ color: 'black', borderColor: 'black', '&:hover': { bgcolor: '#AA947E', borderColor: '#AA947E', color: 'white' } }}>Metrics</Button>
          </div>
        </div>
        </div>
        <div className="NumberCards">
          <div className="NumberCard">
            <Number label="Net Worth" value="$10,000" more="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."/>
          </div>
          <div className="NumberCard">
            <Number label="Savings Rate" value="2%" more="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"/>
          </div>
          <div className="NumberCard">
            <Number label="FIRE #" value="$1,200,000" more="sLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ."/>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
