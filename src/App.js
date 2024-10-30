import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
        <div className="flex">
          {isSidebarOpen && <Sidebar />}
          <div className="flex-grow p-4">
            <Routes>
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
