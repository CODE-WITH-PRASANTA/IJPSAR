import React from 'react'
import DashboardOverview from '../../Components/DashboardOverview/DashboardOverview'
import DashboardAnalytics from '../../Components/DashboardAnalytics/DashboardAnalytics'
import DashboardManagement from '../../Components/DashboardManagement/DashboardManagement'

const Dashboard = () => {
  return (
    <div>
        <DashboardOverview />
        <DashboardAnalytics />
        <DashboardManagement />
    </div>
  )
}

export default Dashboard