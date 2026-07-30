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

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError("")

      const editor = JSON.parse(localStorage.getItem("editorData"))

      if (!editor?._id) {
        throw new Error("Editor session not found")
      }

      const [assignedResponse, publishedResponse] = await Promise.all([
        API.get(`/submitform/editor/${editor._id}`),
        API.get(`/submitform/editor/${editor._id}/published`),
      ])

      const papers = [
        ...(assignedResponse.data?.data || []),
        ...(publishedResponse.data?.data || []),
      ]
      const uniquePapers = Array.from(
        new Map(papers.map((paper) => [paper._id, paper])).values()
      )

      setSubmissions(uniquePapers)
      setEditors([editor])
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
