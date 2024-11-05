import React, { useState, useRef, useEffect } from "react";
import Logo from "../images/starringblack.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoNotifications } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";

const recentOrders = [
  {
    id: "#ts1",
    date: "2024-10-01",
    customer: "Alice",
    productId: "#a1",
    count: 2,
    totalPrice: 50,
    paymentStatus: "Success",
    orderStatus: "Completed",
  },
  {
    id: "#ts2",
    date: "2024-10-02",
    customer: "Bob",
    productId: "#a23",
    count: 1,
    totalPrice: 20,
    paymentStatus: "Pending",
    orderStatus: "In Transit",
  },
  {
    id: "#ts3",
    date: "2024-10-03",
    customer: "Charlie",
    productId: "#a11",
    count: 3,
    totalPrice: 60,
    paymentStatus: "Success",
    orderStatus: "Dispatch",
  },
  {
    id: "#ts4",
    date: "2024-10-04",
    customer: "David",
    productId: "#a7",
    count: 5,
    totalPrice: 100,
    paymentStatus: "Success",
    orderStatus: "Completed",
  },
  {
    id: "#ts5",
    date: "2024-10-05",
    customer: "Eva",
    productId: "#a21",
    count: 2,
    totalPrice: 40,
    paymentStatus: "Pending",
    orderStatus: "In Transit",
  },
  {
    id: "#ts6",
    date: "2024-10-06",
    customer: "Frank",
    productId: "#a10",
    count: 1,
    totalPrice: 30,
    paymentStatus: "Success",
    orderStatus: "Completed",
  },
  {
    id: "#ts7",
    date: "2024-10-07",
    customer: "Grace",
    productId: "#a20",
    count: 4,
    totalPrice: 80,
    paymentStatus: "Pending",
    orderStatus: "Dispatch",
  },
];

const Topbar = ({ toggleSidebar, onLogout }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [clickedOrderIds, setClickedOrderIds] = useState([]);
  const notificationRef = useRef(null);
  const accountRef = useRef(null);

  const toggleNotificationDropdown = () => {
    setIsNotificationOpen(!isNotificationOpen);
    if (isAccountOpen) setIsAccountOpen(false);
  };

  const toggleAccountDropdown = () => {
    setIsAccountOpen(!isAccountOpen);
    if (isNotificationOpen) setIsNotificationOpen(false);
  };

  const getNotificationText = (order) => {
    const paymentMethod =
      order.paymentStatus === "Success" ? "online payment" : "COD";
    return `[${order.id}] ${order.customer} ordered ${order.count} of product ID ${order.productId} through ${paymentMethod}`;
  };

  const handleClickOutside = (event) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target) &&
      accountRef.current &&
      !accountRef.current.contains(event.target)
    ) {
      setIsNotificationOpen(false);
      setIsAccountOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLinkClick = (orderId) => {
    setClickedOrderIds((prevClickedOrderIds) =>
      prevClickedOrderIds.includes(orderId)
        ? prevClickedOrderIds
        : [...prevClickedOrderIds, orderId]
    );
    setIsNotificationOpen(false);
  };

  return (
    <div className="w-full fixed h-[60px] bg-gray-100 flex items-center justify-between p-2 sm:p-4">
      <div className="flex items-center">
        <GiHamburgerMenu
          onClick={toggleSidebar}
          className="text-2xl sm:text-3xl cursor-pointer sm:mr-4"
        />
        <img src={Logo} alt="Logo" className="w-[120px] sm:w-[180px]" />
      </div>
      <div className="flex items-center gap-3 sm:gap-10 relative">
        <div className="relative" ref={notificationRef}>
          <IoNotifications
            className="text-xl sm:text-2xl cursor-pointer"
            onClick={toggleNotificationDropdown}
          />
          {recentOrders.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-3 h-3 flex items-center justify-center text-xs">
              {recentOrders.length}
            </span>
          )}
          {isNotificationOpen && (
            <div className="fixed right-2 mt-2 w-[90vw] max-w-[250px] bg-white border border-gray-300 shadow-lg z-50 h-screen">
              <div className="p-2">
                <h4 className="font-bold text-sm sm:text-lg mb-2">
                  Recent Orders
                </h4>
                <ul className="h-full overflow-y-auto">
                  {recentOrders.map((order) => (
                    <li
                      key={order.id}
                      className={`px-4 py-2 cursor-pointer border border-gray-300 ${
                        clickedOrderIds.includes(order.id)
                          ? "bg-gray-200"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <Link
                        to={`/orders/${order.id}`}
                        onClick={() => handleLinkClick(order.id)}
                      >
                        {getNotificationText(order)}
                      </Link>
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

        <div className="relative" ref={accountRef}>
          <button
            onClick={toggleAccountDropdown}
            className="focus:outline-none"
          >
            <MdAccountCircle className="text-xl sm:text-2xl" />
          </button>
          {isAccountOpen && (
            <div className="absolute right-0 mt-2 w-[90vw] max-w-[160px] bg-white border border-gray-200 rounded shadow-lg z-50">
              <ul>
                <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                  My Account
                </li>
                <li
                  className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                  onClick={() => {
                    setIsAccountOpen(false);
                    onLogout();
                  }}
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
