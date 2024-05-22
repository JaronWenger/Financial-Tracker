import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function NetWorth() {
  const [age, setAge] = React.useState('');
  const [assets, setAssets] = React.useState([{ name: '', value: '' }]);
  const [liabilities, setLiabilities] = React.useState([{ name: '', value: '' }]);

  const handleAddAsset = () => {
    setAssets([...assets, { name: '', value: '' }]);
  };

  const handleRemoveAsset = (index) => {
    const updatedAssets = [...assets];
    updatedAssets.splice(index, 1);
    setAssets(updatedAssets);
  };

  const handleAssetNameChange = (index, newName) => {
    const updatedAssets = [...assets];
    updatedAssets[index].name = newName;
    setAssets(updatedAssets);
  };

  const handleAddLiability = () => {
    setLiabilities([...liabilities, { name: '', value: '' }]);
  };

  const handleRemoveLiability = (index) => {
    const updatedLiabilities = [...liabilities];
    updatedLiabilities.splice(index, 1);
    setLiabilities(updatedLiabilities);
  };

  const handleLiabilityNameChange = (index, newName) => {
    const updatedLiabilities = [...liabilities];
    updatedLiabilities[index].name = newName;
    setLiabilities(updatedLiabilities);
  };

  return (
    <div style={{ margin: '0 300px 200px 300px' }}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Age
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            label="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Assets
        </AccordionSummary>
        <AccordionDetails>
          {assets.map((asset, index) => (
            <div key={index}>
              <TextField
                label="Asset Name"
                value={asset.name}
                onChange={(e) => handleAssetNameChange(index, e.target.value)}
              />
              <TextField
                label="Asset Value"
                value={asset.value}
                onChange={(e) => {
                  const updatedAssets = [...assets];
                  updatedAssets[index].value = e.target.value;
                  setAssets(updatedAssets);
                }}
              />
              <IconButton onClick={() => handleRemoveAsset(index)}>
                <RemoveIcon />
              </IconButton>
            </div>
          ))}
          <IconButton onClick={handleAddAsset}>
            <AddIcon />
          </IconButton>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          Liabilities
        </AccordionSummary>
        <AccordionDetails>
          {liabilities.map((liability, index) => (
            <div key={index}>
              <TextField
                label="Liability Name"
                value={liability.name}
                onChange={(e) => handleLiabilityNameChange(index, e.target.value)}
              />
              <TextField
                label="Liability Value"
                value={liability.value}
                onChange={(e) => {
                  const updatedLiabilities = [...liabilities];
                  updatedLiabilities[index].value = e.target.value;
                  setLiabilities(updatedLiabilities);
                }}
              />
              <IconButton onClick={() => handleRemoveLiability(index)}>
                <RemoveIcon />
              </IconButton>
            </div>
          ))}
          <IconButton onClick={handleAddLiability}>
            <AddIcon />
          </IconButton>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
