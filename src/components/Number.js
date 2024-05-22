import React, { useRef, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const Number = ({ label, value }) => {
  const cardRef = useRef(null);
  const textRef = useRef(null);
  const [fontSize, setFontSize] = useState('100px');

  useEffect(() => {
    const cardWidth = cardRef.current.offsetWidth;
    const textWidth = textRef.current.offsetWidth;
    const maxFontSize = Math.min((cardWidth / textWidth) * 100, 100); // 100 is the maximum font size
    setFontSize(`${maxFontSize-10}px`);
  }, [value]);

  return (
    <div className='NumberCard' style={{ marginBottom: '20px' }}>
      <Chip label={label} variant="outlined" sx={{ mb: 1, fontSize: '2rem', p: '35px', borderWidth: '2px', borderRadius: '39px' }} />

      <Card ref={cardRef}  sx={{ width: '300px', height: '300px' }}>
        <Box sx={{ p: '40px', height: '100%', borderColor: '#121212', borderWidth: '40px' }}>
          <Stack direction="column" justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
            <Typography ref={textRef} gutterBottom variant="h5" component="div" sx={{ fontSize }}>
              {value}
            </Typography>
          </Stack>
        </Box>
      </Card>
    </div>
  );
};