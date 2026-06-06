import React from 'react'
import DashboardHome from '../../Component/DashboardHome/DashboardHome'
import Highlights from '../../Component/Highlights/Highlights'
import Teams from '../../Component/Teams/Teams'

const Dashboard = () => {
  return (
    <div>
     <DashboardHome/>
     <Highlights/>
     <Teams/>
    </div>
  )
}

export default Dashboard