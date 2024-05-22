import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';

import ModeNightIcon from '@mui/icons-material/ModeNight';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function ButtonAppBar({ darkMode, handleThemeChange }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ bgcolor: darkMode ? '#37474f' : '#D5C7BC' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Switch
              checked={darkMode}
              onChange={handleThemeChange}
              name="themeSwitch"
              color="default"
            />
            {darkMode ? <ModeNightIcon sx={{ ml: 1 }} /> : <LightModeIcon sx={{ ml: 1, color: 'black' }} />}
          </Box>
          <Typography
            variant="h6"
            component="div"
            sx={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              color: darkMode ? 'white' : 'black',
              fontFamily: 'Lexend, Arial, sans-serif',
              fontWeight: 700
            }}
          >
            Financial Tracker
          </Typography>
          <Button sx={{ color: darkMode ? 'white' : 'black' }}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
