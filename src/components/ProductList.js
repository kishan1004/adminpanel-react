import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Product1img from "../images/product1.jpeg";
import Product2img from "../images/product2.jpeg";
import Product3img from "../images/product3.jpeg";
import Product4img from "../images/product4.jpeg";
import Product5img from "../images/product5.jpeg";
import Product6img from "../images/product6.jpeg";

const productImages = [
  Product1img,
  Product2img,
  Product3img,
  Product4img,
  Product5img,
  Product6img,
];
const productCategories = [
  "Tshirt",
  "Shirt",
  "Polo",
  "Oversized",
  "Jacket",
  "Hoodie",
];

const productsData = Array.from({ length: 25 }, (_, i) => ({
  id: `#a${i + 1}`,
  photo: productImages[i % productImages.length],
  name: `Product ${i + 1}`,
  category:
    productCategories[Math.floor(Math.random() * productCategories.length)],
  brand: "Brand",
  price: (i + 1) * 10,
  rating: (1 + Math.random() * 4).toFixed(1),
  stock: Math.floor(Math.random() * 100),
}));

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const itemsPerPage = 8;

  const filteredProducts = productsData.filter((product) => {
    return (
      (!selectedCategory || product.category === selectedCategory) &&
      (!selectedPrice ||
        (selectedPrice === "<50" ? product.price < 50 : product.price >= 50)) &&
      (!selectedRating || product.rating >= selectedRating)
    );
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") setSelectedCategory(value);
    if (name === "price") setSelectedPrice(value);
    if (name === "rating") setSelectedRating(value);
    setCurrentPage(1); // Reset to page 1 after filtering
  };
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full mt-[60px]">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Product List</h1>
        <button
          onClick={() => navigate("/upload")} // Navigate to ProductUpload
          className="px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-950"
        >
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        <select
          name="category"
          value={selectedCategory}
          onChange={handleFilterChange}
          className="px-3 py-2 border rounded w-full md:w-auto" // Full width on small screens
        >
          <option value="">All Categories</option>
          {productCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          name="price"
          value={selectedPrice}
          onChange={handleFilterChange}
          className="px-3 py-2 border rounded w-full md:w-auto" // Full width on small screens
        >
          <option value="">All Prices</option>
          <option value="<50">Under $50</option>
          <option value=">=50">$50 and above</option>
        </select>

        <select
          name="rating"
          value={selectedRating}
          onChange={handleFilterChange}
          className="px-3 py-2 border rounded w-full md:w-auto" // Full width on small screens
        >
          <option value="">All Ratings</option>
          <option value="1">1 and above</option>
          <option value="2">2 and above</option>
          <option value="3">3 and above</option>
          <option value="4">4 and above</option>
        </select>
      </div>

      <div className="overflow-x-auto shadow-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 border">ID</th>
              <th className="py-3 px-4 border">Product</th>
              <th className="py-3 px-4 border">Category</th>
              <th className="py-3 px-4 border">Brand</th>
              <th className="py-3 px-4 border">Price</th>
              <th className="py-3 px-4 border">Rating</th>
              <th className="py-3 px-4 border">Stock</th>
              <th className="py-3 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((product) => (
              <tr key={product.id} className="text-center">
                <td className="py-3 px-4 border">{product.id}</td>
                <td className="py-3 px-4 border flex items-center justify-center gap-2">
                  <img
                    src={product.photo}
                    alt={product.name}
                    className="w-10 h-14 rounded"
                  />
                  <span>{product.name}</span>
                </td>
                <td className="py-3 px-4 border">{product.category}</td>
                <td className="py-3 px-4 border">{product.brand}</td>
                <td className="py-3 px-4 border">${product.price}</td>
                <td className="py-3 px-4 border">{product.rating}</td>
                <td className="py-3 px-4 border">{product.stock}</td>
                <td className="py-3 px-4 flex justify-center bg-gray-100 gap-3">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 mx-1 rounded-md ${
              currentPage === i + 1
                ? "bg-black text-white"
                : "bg-gray-300 text-gray-800 hover:bg-gray-400"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
