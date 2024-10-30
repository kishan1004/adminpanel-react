import "./App.css";
import React, { useState } from "react";
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

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="App">
        <Topbar toggleSidebar={toggleSidebar} />
        <div className="flex flex-col md:flex-row">
          {isSidebarOpen && <Sidebar className="hidden md:block" />}
          <div className="flex-grow p-4 md:pl-8 md:pt-4">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/upload" element={<ProductUpload />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
