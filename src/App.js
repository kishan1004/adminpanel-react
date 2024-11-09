import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./components/Dashboard";
import ProductList from "./components/ProductList";
import ProductUpload from "./components/ProductUpload";
import Orders from "./components/Orders";
import Testimonials from "./components/Testimonials";
import Settings from "./components/Settings";
import Login from "./components/Login";
import OrderDetail from "./components/OrderDetail";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true"); // Store auth state in localStorage
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated"); // Remove auth state from localStorage
  };

  useEffect(() => {
    // Check if the user is authenticated when the app loads
    const storedAuthState = localStorage.getItem("isAuthenticated");
    if (storedAuthState === "true") {
      setIsAuthenticated(true); // Set state based on stored value
    }
  }, []);

  return (
    <Router>
      <div className="App">
        {!isAuthenticated ? (
          <Login onLogin={handleLogin} />
        ) : (
          <>
            <Topbar toggleSidebar={toggleSidebar} onLogout={handleLogout} />
            <div className="flex flex-col lg:flex-row">
              {isSidebarOpen && <Sidebar toggleSidebar={toggleSidebar} />}
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/upload" element={<ProductUpload />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/orders/:orderId" element={<OrderDetail />} />
                  <Route path="/testimonials" element={<Testimonials />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </div>
            </div>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
