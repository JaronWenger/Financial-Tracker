import React, { useState } from "react";
import { Number } from './components/Number';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ButtonAppBar from "./components/NavBar";
import NetWorth from "./components/Networth";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#37474f' : '#D5C7BC',
      },
    },
    typography: {
      fontFamily: 'Lexend, Arial, sans-serif',
      h6: {
        fontWeight: 700,
      },
    },
  });

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <ButtonAppBar darkMode={darkMode} handleThemeChange={handleThemeChange} />

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

        <NetWorth/>
      </div>
    </ThemeProvider>
  );
}

export default App;
