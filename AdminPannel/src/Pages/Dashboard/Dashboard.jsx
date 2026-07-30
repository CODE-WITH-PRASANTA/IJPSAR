import { useCallback, useEffect, useState } from "react";
import DashboardHome from "../../Component/DashboardHome/DashboardHome";
import Highlights from "../../Component/Highlights/Highlights";
import Teams from "../../Component/Teams/Teams";
import API from "../../api/axios";

const initialDashboardData = {
  stats: {
    totalSubmissions: 0,
    pendingPapers: 0,
    pendingPayments: 0,
    publishedPapers: 0,
    activeEditors: 0,
    revenue: 0,
  },
  recentSubmissions: [],
  latestPublications: [],
  recentPayments: [],
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(initialDashboardData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const requestDashboardData = useCallback(async () => {
    const response = await API.get("/dashboard/overview");
    return response.data.data || initialDashboardData;
  }, []);

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      setDashboardData(await requestDashboardData());
    } catch (requestError) {
      console.error("Dashboard load error:", requestError);
      setError("Dashboard data could not be loaded. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [requestDashboardData]);

  useEffect(() => {
    let isMounted = true;

    requestDashboardData()
      .then((data) => {
        if (isMounted) setDashboardData(data);
      })
      .catch((requestError) => {
        console.error("Dashboard load error:", requestError);
        if (isMounted) {
          setError("Dashboard data could not be loaded. Please try again.");
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [requestDashboardData]);

  return (
    <div>
      <DashboardHome
        stats={dashboardData.stats}
        loading={loading}
        error={error}
        onRetry={loadDashboard}
      />
      <Highlights
        revenue={dashboardData.stats.revenue}
        payments={dashboardData.recentPayments}
        loading={loading}
      />
      <Teams
        submissions={dashboardData.recentSubmissions}
        publications={dashboardData.latestPublications}
        loading={loading}
      />
    </div>
  );
};

export default Dashboard;
