import React, { useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import { FaSearch, FaFacebook, FaInstagram } from "react-icons/fa";
import {
  FaUsers,
  FaShoppingCart,
  FaCheck,
  FaClock,
  FaDollarSign,
} from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  // Dummy data for different time ranges
  const statsData = {
    lastDay: {
      totalUsers: 10,
      totalOrders: 25,
      completedOrders: 18,
      pendingOrders: 7,
      earnings: "$500",
      ordersOverTime: [5, 15, 25], // Total orders every 6 hours
      completedOrdersOverTime: [2, 10, 18], // Completed orders every 6 hours
      pendingOrdersOverTime: [3, 5, 7], // Pending orders every 6 hours
      timeLabels: ["0h", "6h", "12h"], // Labels for 6-hour intervals
      trafficData: {
        organicSearch: 50,
        facebook: 20,
        instagram: 10,
        dailySales: 500,
      },
    },
    lastWeek: {
      totalUsers: 200,
      totalOrders: 450,
      completedOrders: 300,
      pendingOrders: 150,
      earnings: "$3,000",
      ordersOverTime: [50, 200, 400, 450], // Total orders every 2 days
      completedOrdersOverTime: [20, 100, 200, 300], // Completed orders every 2 days
      pendingOrdersOverTime: [30, 50, 70, 150], // Pending orders every 2 days
      timeLabels: ["Day 0", "Day 2", "Day 4", "Day 6"], // Labels for 2-day intervals
      trafficData: {
        organicSearch: 300,
        facebook: 100,
        instagram: 50,
        dailySales: 500,
      },
    },
    lastMonth: {
      totalUsers: 800,
      totalOrders: 1200,
      completedOrders: 950,
      pendingOrders: 250,
      earnings: "$12,000",
      ordersOverTime: [100, 500, 900, 1200], // Total orders every 10 days
      completedOrdersOverTime: [50, 400, 800, 950], // Completed orders every 10 days
      pendingOrdersOverTime: [20, 50, 150, 250], // Pending orders every 10 days
      timeLabels: ["Day 0", "Day 15", "Day 30"], // Labels for 10-day intervals
      trafficData: {
        organicSearch: 600,
        facebook: 300,
        instagram: 100,
        dailySales: 500,
      },
    },
    lastYear: {
      totalUsers: 9500,
      totalOrders: 18000,
      completedOrders: 16000,
      pendingOrders: 2000,
      earnings: "$150,000",
      ordersOverTime: [2000, 8000, 12000, 16000, 18000], // Total orders every 3 months
      completedOrdersOverTime: [1500, 5000, 11000, 15000, 16000], // Completed orders every 3 months
      pendingOrdersOverTime: [500, 3000, 5000, 1000, 2000], // Pending orders every 3 months
      timeLabels: ["Month 0", "Month 3", "Month 6", "Month 9", "Month 12"], // Labels for 3-month intervals
      trafficData: {
        organicSearch: 4000,
        facebook: 1500,
        instagram: 500,
        dailySales: 500,
      },
    },
  };

  const [timeRange, setTimeRange] = useState("lastDay");
  const stats = statsData[timeRange];

  // Prepare data for the chart
  const chartData = {
    labels: stats.timeLabels,
    datasets: [
      {
        label: "Total Orders",
        data: stats.ordersOverTime,
        borderColor: "green",
        backgroundColor: "rgba(0,255,0,0.1)",
      },
      {
        label: "Completed Orders",
        data: stats.completedOrdersOverTime,
        borderColor: "purple",
        backgroundColor: "rgba(128,0,128,0.1)",
      },
      {
        label: "Pending Orders",
        data: stats.pendingOrdersOverTime,
        borderColor: "orange",
        backgroundColor: "rgba(255,165,0,0.1)",
      },
    ],
  };

  const pieChartData = {
    labels: ["Completed Orders", "Pending Orders"],
    datasets: [
      {
        label: "Order Status",
        data: [stats.completedOrders, stats.pendingOrders],
        backgroundColor: ["rgba(75,192,192,1)", "rgba(255,205,86,1)"],
        hoverBackgroundColor: ["rgba(75,192,192,0.8)", "rgba(255,205,86,0.8)"],
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full mt-[60px]">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Time Range Selector */}
      <div className="mb-6 flex gap-4">
        {["lastDay", "lastWeek", "lastMonth", "lastYear"].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`py-1 px-4 rounded ${
              timeRange === range ? "bg-black text-white" : "bg-[#D9D9D9]"
            }`}
          >
            {range.replace("last", "Last ")}
          </button>
        ))}
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {/* Total Users Card */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
          <FaUsers className="text-blue-500 text-3xl mr-4" />
          <div>
            <p className="text-gray-500">Total Users</p>
            <h3 className="text-2xl font-semibold">{stats.totalUsers}</h3>
          </div>
        </div>

        {/* Total Orders Card */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
          <FaShoppingCart className="text-green-500 text-3xl mr-4" />
          <div>
            <p className="text-gray-500">Total Orders</p>
            <h3 className="text-2xl font-semibold">{stats.totalOrders}</h3>
          </div>
        </div>

        {/* Orders Completed Card */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
          <FaCheck className="text-purple-500 text-3xl mr-4" />
          <div>
            <p className="text-gray-500">Orders Completed</p>
            <h3 className="text-2xl font-semibold">{stats.completedOrders}</h3>
          </div>
        </div>

        {/* Orders Pending Card */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
          <FaClock className="text-yellow-500 text-3xl mr-4" />
          <div>
            <p className="text-gray-500">Orders Pending</p>
            <h3 className="text-2xl font-semibold">{stats.pendingOrders}</h3>
          </div>
        </div>

        {/* Earnings Card */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
          <FaDollarSign className="text-red-500 text-3xl mr-4" />
          <div>
            <p className="text-gray-500">Earnings</p>
            <h3 className="text-2xl font-semibold">{stats.earnings}</h3>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white grid grid-cols-2 p-5 my-10 rounded-lg shadow-md">
        <div>
          <h2 className="text-lg font-semibold mb-4">Statistics Overview</h2>
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: {
                  display: true,
                  text: `Orders Overview for ${timeRange.replace(
                    "last",
                    "Last "
                  )}`,
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Time",
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Number of Orders",
                  },
                },
              },
            }}
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4 mt-10">
            Order Status Distribution
          </h2>
          <Pie
            data={pieChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Completed vs Pending Orders",
                },
              },
            }}
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">Traffic & Sales Overview</h2>

        {/* Traffic Sources */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Organic Search */}
          <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow">
            <FaSearch className="text-blue-500 text-3xl mr-4" />
            <div>
              <p className="text-gray-500">Organic Search</p>
              <h3 className="text-2xl font-semibold">
                {stats.trafficData.organicSearch}
              </h3>
            </div>
          </div>

          {/* Facebook */}
          <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow">
            <FaFacebook className="text-blue-600 text-3xl mr-4" />
            <div>
              <p className="text-gray-500">Facebook</p>
              <h3 className="text-2xl font-semibold">
                {stats.trafficData.facebook}
              </h3>
            </div>
          </div>

          {/* Instagram */}
          <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow">
            <FaInstagram className="text-pink-500 text-3xl mr-4" />
            <div>
              <p className="text-gray-500">Instagram</p>
              <h3 className="text-2xl font-semibold">
                {stats.trafficData.instagram}
              </h3>
            </div>
          </div>
        </div>

        {/* Daily Sales */}
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <h3 className="text-gray-500">Daily Sales</h3>
          <h2 className="text-2xl font-semibold">
            ${stats.trafficData.dailySales}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
