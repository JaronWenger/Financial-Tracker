import React, { useRef, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const Number = ({ label, value }) => {
  const cardRef = useRef(null);
  const textRef = useRef(null);
  const [fontSize, setFontSize] = useState('100px');

  useEffect(() => {
    const cardWidth = cardRef.current.offsetWidth;
    const textWidth = textRef.current.offsetWidth;
    const maxFontSize = Math.min((cardWidth / textWidth) * 100, 100);
    setFontSize(`${maxFontSize - 10}px`);
  }, [value]);

  return (
    <div className='NumberCard' style={{ marginBottom: '20px' }}>
      <Card ref={cardRef} sx={{ width: '300px', height: '200px', backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>

          <Stack direction="column" justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
            <Typography ref={textRef} gutterBottom variant="h5" component="div" sx={{ fontSize, color: 'black' }}>
              {value}
            </Typography>
          </Stack>

      </Card>
      <div style={{ position: 'relative', marginTop: '-20px' }}>
        <Accordion sx={{ borderRadius: '800px' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{ minHeight: '50px', backgroundColor: 'rgba(255, 255, 255, 0.5)' }} // Set a transparent background
          >
            {label}
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Content for Accordion 1
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};
