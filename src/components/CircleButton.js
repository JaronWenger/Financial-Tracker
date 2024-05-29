import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ToggleIconButton = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <div className='AndMore'>
    <div className='CircleButton'>
      <IconButton
        aria-label={expanded ? 'collapse' : 'expand'}
        size="small"
        onClick={handleToggle}
        sx={{
          bgcolor: '#333', // Change the bgcolor to dark grey
          borderRadius: '50%',
          color: 'white',
        }}
      >
        {expanded ? <KeyboardArrowUpIcon /> : <ExpandMoreIcon />}
      </IconButton>
      </div>
    </div>

  );
};

export default ToggleIconButton;
