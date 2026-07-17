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

  const fetchAllSubmissions = async () => {
    try {
      setLoading(true)
      setError("")

      const [firstResponse, paymentsResponse] = await Promise.all([
        API.get("/submitform/all", {
          params: { page: 1, limit: 100 },
        }),
        API.get("/payment"),
      ])

      setPayments(paymentsResponse.data?.payments || [])

      if (!firstResponse.data?.success) {
        setSubmissions([])
        return
      }

      const firstPageData = firstResponse.data.data || []
      const totalPages = firstResponse.data.pages || 1

      if (totalPages <= 1) {
        setSubmissions(firstPageData)
        return
      }

      const remainingRequests = Array.from(
        { length: totalPages - 1 },
        (_, index) =>
          API.get("/submitform/all", {
            params: { page: index + 2, limit: 100 },
          })
      )

      const remainingResponses = await Promise.all(remainingRequests)
      const remainingData = remainingResponses.flatMap(
        (response) => response.data?.data || []
      )

      setSubmissions([...firstPageData, ...remainingData])
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
    fetchAllSubmissions()
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
