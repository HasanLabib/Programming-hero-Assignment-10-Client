import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import { FaStar, FaHeart, FaUsers, FaList } from "react-icons/fa";

const COLORS = ["#ef4444", "#f97316", "#f59e0b", "#84cc16", "#22c55e"];

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.email === "admin@test.com";

  const [userStats, setUserStats] = useState(null);
  const [adminStats, setAdminStats] = useState(null);
  const [ratingData, setRatingData] = useState([]);
  const [recentReviews, setRecentReviews] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        if (isAdmin) {
          const adminStatsRes = await axios.get(
            "https://programming-hero-assignment-10-serv.vercel.app/dashboard/admin-stats"
          );
          setAdminStats(adminStatsRes.data);

          const ratingRes = await axios.get(
            "https://programming-hero-assignment-10-serv.vercel.app/dashboard/admin-rating-distribution"
          );
          setRatingData(ratingRes.data);

          const recentRes = await axios.get(
            "https://programming-hero-assignment-10-serv.vercel.app/dashboard/admin-recent-reviews"
          );
          setRecentReviews(recentRes.data);

          const monthlyRes = await axios.get(
            "https://programming-hero-assignment-10-serv.vercel.app/dashboard/admin-reviews-over-time"
          );
          setMonthlyData(monthlyRes.data);
        } else {
          const userStatsRes = await axios.get(
            `https://programming-hero-assignment-10-serv.vercel.app/dashboard/user-stats/${user.email}`
          );
          setUserStats(userStatsRes.data);
          setRatingData(userStatsRes.data.ratingDistribution);

          const recentRes = await axios.get(
            `https://programming-hero-assignment-10-serv.vercel.app/dashboard/recent-reviews/${user.email}`
          );
          setRecentReviews(recentRes.data);
        }
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user, isAdmin]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const chartData = ratingData.map((item) => ({
    rating: "⭐".repeat(item.rating),
    count: item.count,
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        {isAdmin ? "Admin Dashboard" : "My Dashboard"}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {!isAdmin && (
          <>
            <StatCard
              title="My Reviews"
              value={userStats?.totalReviews}
              icon={<FaStar />}
            />
            <StatCard
              title="My Favorites"
              value={userStats?.totalFavorites}
              icon={<FaHeart />}
            />
          </>
        )}

        {isAdmin && (
          <>
            <StatCard
              title="Total Users"
              value={adminStats?.totalUsers}
              icon={<FaUsers />}
            />
            <StatCard
              title="Total Reviews"
              value={adminStats?.totalReviews}
              icon={<FaList />}
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="Ratings Distribution">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rating" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Ratings Breakdown">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={chartData} dataKey="count" outerRadius={80}>
                {chartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {isAdmin && (
          <ChartCard title="All Reviews Over Time">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  dataKey="reviews"
                  stroke="#6366f1"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        )}
      </div>

      <ChartCard title="Recent Reviews">
        <div className="space-y-3">
          {recentReviews.map((review) => (
            <div
              key={review._id}
              className="flex justify-between border-b pb-2"
            >
              <span>{review.foodName}</span>
              <span className="text-amber-500">★ {review.rating}</span>
            </div>
          ))}
        </div>
      </ChartCard>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-4 rounded-lg shadow flex justify-between">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value || 0}</p>
    </div>
    <div className="text-xl text-amber-500">{icon}</div>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h2 className="font-bold mb-4">{title}</h2>
    {children}
  </div>
);

export default DashboardHome;
