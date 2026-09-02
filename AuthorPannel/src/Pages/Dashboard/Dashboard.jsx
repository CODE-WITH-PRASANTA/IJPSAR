import React, { useEffect, useState } from 'react'
import Overview from '../../Components/Overview/Overview'
import SalesTime from '../../Components/SalesTime/SalesTime'
import Latestorders from '../../Components/Latestorders/Latestorders'
import API from '../../api/axios'

const Dashboard = () => {
  const [submissions, setSubmissions] = useState([])
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchAuthorDashboardData = async () => {
    try {
      setLoading(true)
      setError("")

      const [papersResponse, paymentsResponse] = await Promise.all([
        API.get("/submitform/my-papers"),
        API.get("/transactions/my-transactions"),
      ])

      setPayments(paymentsResponse.data?.data || [])

      if (!papersResponse.data?.success) {
        setSubmissions([])
        return
      }

      setSubmissions(papersResponse.data.data || [])
    } catch (err) {
      console.log(err)
      setError("Unable to load dashboard papers.")
      setSubmissions([])
      setPayments([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAuthorDashboardData()
  }, [])

  return (
    <div>
        <Overview
          submissions={submissions}
          payments={payments}
          loading={loading}
        />
        <SalesTime
          submissions={submissions}
          loading={loading}
          error={error}
        />
        <Latestorders
          submissions={submissions}
          loading={loading}
          error={error}
        />
    </div>
  )
}

export default Dashboard
