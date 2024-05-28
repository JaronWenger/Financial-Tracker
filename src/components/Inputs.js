import React from 'react'
import { InputForm } from './InputForm';

export const Inputs = () => {



  return (
    <div className='Table'>


    <InputForm title="Age" description="The age you are today." input={23} />

    <InputForm title="Annual Income" description="Household income after taxes." input={50000} />

    <InputForm title="Annual Expenses" description="The age you are today." input={30000} />






    </div>
  )
}
