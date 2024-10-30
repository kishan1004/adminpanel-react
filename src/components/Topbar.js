import React, { useState } from "react";
import Logo from "../images/starringblack.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoNotifications } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";

// Sample recent orders data
const recentOrders = [
  {
    id: "#ts1",
    customer: "Alice",
    productId: "#a1",
    count: 2,
    totalPrice: 50,
    paymentStatus: "Success",
  },
  {
    id: "#ts2",
    customer: "Bob",
    productId: "#a23",
    count: 1,
    totalPrice: 20,
    paymentStatus: "Pending",
  },
  {
    id: "#ts3",
    customer: "Charlie",
    productId: "#a11",
    count: 3,
    totalPrice: 60,
    paymentStatus: "Success",
  },
  {
    id: 4,
    customer: "David",
    productId: 104,
    count: 5,
    paymentStatus: "Success",
  },
  {
    id: 5,
    customer: "Eva",
    productId: 105,
    count: 2,
    paymentStatus: "Pending",
  },
];

const Topbar = ({ toggleSidebar }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const toggleNotificationDropdown = () => {
    setIsNotificationOpen(!isNotificationOpen);
    // Close account dropdown if it's open
    if (isAccountOpen) setIsAccountOpen(false);
  };

  const toggleAccountDropdown = () => {
    setIsAccountOpen(!isAccountOpen);
    // Close notification dropdown if it's open
    if (isNotificationOpen) setIsNotificationOpen(false);
  };

  const getNotificationText = (order) => {
    const paymentMethod =
      order.paymentStatus === "Success" ? "online payment" : "COD";
    return `${order.customer} ordered ${order.count} of product ID ${order.productId} through ${paymentMethod}`;
  };

  return (
    <div className="w-full fixed h-[60px] bg-gray-100 flex items-center justify-between p-2">
      <div className="flex gap-5 items-center">
        <img src={Logo} alt="Logo" className="w-[250px] hidden md:block" />
        <GiHamburgerMenu
          onClick={toggleSidebar}
          className="text-3xl cursor-pointer"
        />
      </div>
      <div className="flex gap-10 px-10 relative">
        <div className="relative">
          <IoNotifications
            className="text-3xl cursor-pointer"
            onClick={toggleNotificationDropdown}
          />
          {/* Notification Badge */}
          {recentOrders.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {recentOrders.length}
            </span>
          )}
          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded shadow-lg z-10">
              <div className="p-2">
                <h4 className="font-bold text-lg mb-2">Recent Orders</h4>
                <ul>
                  {recentOrders.slice(0, 3).map((order) => (
                    <li
                      key={order.id}
                      className="hover:bg-gray-100 px-4 py-2 cursor-pointer border"
                    >
                      {getNotificationText(order)}
                    </li>
                  ))}
                  {recentOrders.length === 0 && (
                    <li className="px-4 py-2 text-gray-500">
                      No recent orders
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className="relative inline-block text-left">
          <button
            onClick={toggleAccountDropdown}
            className="focus:outline-none"
          >
            <MdAccountCircle className="text-3xl" />
          </button>

          {isAccountOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10">
              <ul>
                <li
                  className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                  onClick={() => setIsAccountOpen(false)}
                >
                  My Account
                </li>
                <li
                  className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                  onClick={() => setIsAccountOpen(false)}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
