import { Switch } from '@mui/material'
import React from 'react'

export const SwitchForm = ({ isMonthly, toggleFrequency }) => {


    const label = { inputProps: { 'aria-label': 'Color switch demo' } };


  return (

    <div className='SwitchForm'>
    <p className="bottom-aligned">Y</p>
      <div className="switch-container">
        <Switch {...label} checked={isMonthly === 0} onChange={toggleFrequency} color="default" />
      </div>
      <p className="bottom-aligned">M</p>
    </div>

  )
}
