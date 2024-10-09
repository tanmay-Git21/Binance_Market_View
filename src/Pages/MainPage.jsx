import React from 'react'
import Navbar from '../myComponents/Navbar'
import WorkingCharts from '../myComponents/WorkingSection'

const MainPage = () => {
  return (
    <div className='w-[100%] h-[100vh] bg-slate-800'>
        <Navbar></Navbar>
        <WorkingCharts></WorkingCharts>
    </div>
  )
}

export default MainPage