import React, { useRef, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

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

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  const card = (
    <React.Fragment>
      <CardContent>


        <Stack direction="column" justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
            <Typography ref={textRef} gutterBottom variant="h5" component="div" sx={{ fontSize, color: 'black' }}>
              {value}
            </Typography>
          </Stack>

        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {label}
        </Typography>
        
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Adjust</Button>
      </CardActions>
    </React.Fragment>
  );



  return (
    <div className='NumberCard' style={{ marginBottom: '20px' }}>

    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>






      <Card ref={cardRef} sx={{ width: '300px', height: '200px', backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>


      </Card>
      
    </div>
  );
};
