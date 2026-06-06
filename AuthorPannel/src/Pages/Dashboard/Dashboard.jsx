import React from 'react'
import Overview from '../../Components/Overview/Overview'
import SalesTime from '../../Components/SalesTime/SalesTime'
import Latestorders from '../../Components/Latestorders/Latestorders'

const Dashboard = () => {
  return (
    <div>
        <Overview />
        <SalesTime />
        <Latestorders />
    </div>
  )
}

export default Dashboard