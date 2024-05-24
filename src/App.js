import React from "react";
import { Number } from './components/Number';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";

function App() {
  const theme = createTheme({
    palette: {
      mode: 'light', // Set the mode to 'light'
      background: {
        default: '#37474f', // Light mode background color
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
        <Button variant="outlined" sx={{ color: 'black', borderColor: 'black' }}>Metrics</Button>  
<Typography sx={{ fontSize: '2rem', whiteSpace: 'nowrap', color: 'black' }}>Financial Tracker</Typography>
<Button variant="outlined" sx={{ color: 'black', borderColor: 'black' }}>Login</Button>

        </div> 


        <div className="NumberCards">

          <div className="NumberCard">
            <Number label="Net Worth" value="$10,000" />
          </div>
          <div className="NumberCard">
            <Number label="Savings Rate" value="20%" />
          </div>
          <div className="NumberCard">
            <Number label="FIRE #" value="$1,200,000" />
          </div>
        </div>

        </div>

      </div>
    </ThemeProvider>
  );
}

export default App;
