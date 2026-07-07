import React, { useEffect, useState } from 'react'
import DashboardOverview from '../../Components/DashboardOverview/DashboardOverview'
import DashboardAnalytics from '../../Components/DashboardAnalytics/DashboardAnalytics'
import DashboardManagement from '../../Components/DashboardManagement/DashboardManagement'
import API from '../../API/axios'

const Dashboard = () => {
  const [submissions, setSubmissions] = useState([])
  const [editors, setEditors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchAllSubmissions = async () => {
    const firstResponse = await API.get("/submitform/all", {
      params: { page: 1, limit: 100 },
    })

    const firstPageData = firstResponse.data?.data || []
    const totalPages = firstResponse.data?.pages || 1

    if (totalPages <= 1) return firstPageData

    const remainingResponses = await Promise.all(
      Array.from({ length: totalPages - 1 }, (_, index) =>
        API.get("/submitform/all", {
          params: { page: index + 2, limit: 100 },
        })
      )
    )

    return [
      ...firstPageData,
      ...remainingResponses.flatMap((response) => response.data?.data || []),
    ]
  }

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError("")

      const [papersData, editorsResponse] = await Promise.all([
        fetchAllSubmissions(),
        API.get("/editor/all"),
      ])

      setSubmissions(papersData)
      setEditors(editorsResponse.data?.data || [])
    } catch (err) {
      console.log(err)
      setError("Unable to load dashboard data.")
      setSubmissions([])
      setEditors([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  return (
    <div>
        <DashboardOverview
          papers={submissions}
          allPapers={submissions}
          editors={editors}
          loading={loading}
        />
        <DashboardAnalytics
          papers={submissions}
          allPapers={submissions}
          loading={loading}
        />
        <DashboardManagement
          papers={submissions}
          allPapers={submissions}
          editors={editors}
          loading={loading}
          error={error}
        />
    </div>
  )
}

export default Dashboard
