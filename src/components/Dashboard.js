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
      totalUsers: 150,
      totalOrders: 45,
      completedOrders: 38,
      pendingOrders: 5,
      canceledOrders: 2,
      returns: 3,
      earnings: "$1,200",
      ordersOverTime: [10, 20, 40, 45], // Orders every 6 hours
      completedOrdersOverTime: [5, 15, 30, 38],
      pendingOrdersOverTime: [2, 4, 5, 5],
      timeLabels: ["0h", "6h", "12h", "18h"],
      trafficData: {
        organicSearch: 120,
        facebook: 50,
        instagram: 25,
        direct: 40,
        referral: 20,
        paidAds: 15,
        dailySales: 1200,
      },
    },
    lastWeek: {
      totalUsers: 900,
      totalOrders: 600,
      completedOrders: 500,
      pendingOrders: 80,
      canceledOrders: 20,
      returns: 15,
      earnings: "$10,500",
      ordersOverTime: [100, 300, 500, 600],
      completedOrdersOverTime: [80, 250, 400, 500],
      pendingOrdersOverTime: [20, 30, 70, 80],
      timeLabels: ["Day 1", "Day 3", "Day 5", "Day 7"],
      trafficData: {
        organicSearch: 400,
        facebook: 120,
        instagram: 100,
        direct: 150,
        referral: 80,
        paidAds: 60,
        dailySales: 1500,
      },
    },
    lastMonth: {
      totalUsers: 3500,
      totalOrders: 4500,
      completedOrders: 4000,
      pendingOrders: 300,
      canceledOrders: 100,
      returns: 50,
      earnings: "$78,000",
      ordersOverTime: [500, 1500, 3000, 4500], // Orders every 10 days
      completedOrdersOverTime: [400, 1200, 2800, 4000],
      pendingOrdersOverTime: [50, 100, 200, 300],
      timeLabels: ["Day 1", "Day 10", "Day 20", "Day 30"],
      trafficData: {
        organicSearch: 1500,
        facebook: 600,
        instagram: 400,
        direct: 800,
        referral: 350,
        paidAds: 250,
        dailySales: 2600,
      },
    },
    lastYear: {
      totalUsers: 42000,
      totalOrders: 50000,
      completedOrders: 47000,
      pendingOrders: 2000,
      canceledOrders: 500,
      returns: 300,
      earnings: "$650,000",
      ordersOverTime: [5000, 15000, 30000, 45000, 50000], // Every 3 months
      completedOrdersOverTime: [4500, 14000, 27000, 42000, 47000],
      pendingOrdersOverTime: [300, 500, 1500, 2000, 2000],
      timeLabels: ["Month 1", "Month 3", "Month 6", "Month 9", "Month 12"],
      trafficData: {
        organicSearch: 20000,
        facebook: 6000,
        instagram: 4000,
        direct: 9000,
        referral: 3000,
        paidAds: 2000,
        dailySales: 3500,
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
    labels: ["Completed", "Pending", "Canceled", "Returns"],
    datasets: [
      {
        label: "Order Status Distribution",
        data: [
          stats.completedOrders,
          stats.pendingOrders,
          stats.canceledOrders,
          stats.returns,
        ],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "rgba(255,205,86,1)",
          "rgba(255,99,132,1)",
          "rgba(153,102,255,1)",
        ],
        hoverBackgroundColor: [
          "rgba(75,192,192,0.8)",
          "rgba(255,205,86,0.8)",
          "rgba(255,99,132,0.8)",
          "rgba(153,102,255,0.8)",
        ],
      },
    ],
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full mt-[60px]">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Time Range Selector */}
      <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        {["lastDay", "lastWeek", "lastMonth", "lastYear"].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`py-2 px-4 rounded ${
              timeRange === range ? "bg-black text-white" : "bg-[#D9D9D9]"
            } `} // Added hover effect
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

      <div className="mb-5 lg:mb-0 hidden md:block max-w-full p-4 bg-white shadow-md rounded-md my-4 ">
        {/* Added margin for spacing on smaller screens */}
        <h2 className="text-lg font-semibold mb-4">Statistics Overview</h2>
        <div className="max-w-[800px] mx-auto">
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
      </div>
      <div className="bg-white grid lg:grid-cols-2 grid-cols-1  p-5 my-10 rounded-lg shadow-md">
        <div>
          <h2 className="text-lg font-semibold mb-4">
            {/* Adjusted margin for mobile responsiveness */}
            Order Status Distribution
          </h2>
          <div className="max-w-[400px]">
            <Pie
              data={pieChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "right",
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
        <div className="">
          <h2 className="text-lg font-semibold mb-4">
            Traffic & Sales Overview
          </h2>

          {/* Traffic Sources */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
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
    </div>
  );
};

export default Dashboard;
