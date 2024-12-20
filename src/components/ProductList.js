import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
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
const initialCategories = [
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
    initialCategories[Math.floor(Math.random() * initialCategories.length)],
  brand: "Brand",
  price: (i + 1) * 10,
  rating: (1 + Math.random() * 4).toFixed(1),
  stock: Math.floor(Math.random() * 100),
  stockUpdatedDate: new Date(
    new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 30))
  ),
}));

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [productCategories] = useState(initialCategories);
  const [products, setProducts] = useState(productsData);
  const [isEditing, setIsEditing] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const itemsPerPage = 8;

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    const matchesDate =
      (!startDate ||
        new Date(product.stockUpdatedDate) >= new Date(startDate)) &&
      (!endDate || new Date(product.stockUpdatedDate) <= new Date(endDate));

    return matchesCategory && matchesDate;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);
  const handleEditClick = (product) => {
    setIsEditing(product.id);
    setEditFormData({ ...product });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveClick = () => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === isEditing ? { ...editFormData } : product
      )
    );
    setIsEditing(null);
  };
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") setSelectedCategory(value);
    setCurrentPage(1);
  };

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    }
  };

  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full mt-[60px]">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Product List</h1>
        <button
          onClick={() => navigate("/upload")}
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
          className="px-3 py-2 border rounded w-full md:w-auto overflow-scroll  max-h-40"
        >
          <option value="">All Categories</option>
          {productCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Date range filters */}
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
          <label className="font-medium">From:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-3 py-2 border rounded w-full md:w-auto"
          />
          <label className="font-medium">To:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-3 py-2 border rounded w-full md:w-auto"
          />
        </div>
      </div>

      {/* Product Table */}
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
              <th className="py-3 px-4 border">Stock Updated Date</th>
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
                  {isEditing === product.id ? (
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={handleInputChange}
                      className="border px-2 py-1 rounded"
                    />
                  ) : (
                    <span>{product.name}</span>
                  )}
                </td>
                <td className="py-3 px-4 border">
                  {isEditing === product.id ? (
                    <input
                      type="text"
                      name="category"
                      value={editFormData.category}
                      onChange={handleInputChange}
                      className="border px-2 py-1 rounded"
                    />
                  ) : (
                    product.category
                  )}
                </td>
                <td className="py-3 px-4 border">
                  {isEditing === product.id ? (
                    <input
                      type="text"
                      name="brand"
                      value={editFormData.brand}
                      onChange={handleInputChange}
                      className="border px-2 py-1 rounded"
                    />
                  ) : (
                    product.brand
                  )}
                </td>
                <td className="py-3 px-4 border">
                  {isEditing === product.id ? (
                    <input
                      type="number"
                      name="price"
                      value={editFormData.price}
                      onChange={handleInputChange}
                      className="border px-2 py-1 rounded"
                    />
                  ) : (
                    `Rs.${product.price}`
                  )}
                </td>
                <td className="py-3 px-4 border">
                  {isEditing === product.id ? (
                    <input
                      type="number"
                      name="rating"
                      value={editFormData.rating}
                      onChange={handleInputChange}
                      className="border px-2 py-1 rounded"
                    />
                  ) : (
                    product.rating
                  )}
                </td>
                <td className="py-3 px-4 border">
                  {isEditing === product.id ? (
                    <input
                      type="number"
                      name="stock"
                      value={editFormData.stock}
                      onChange={handleInputChange}
                      className="border px-2 py-1 rounded"
                    />
                  ) : (
                    product.stock
                  )}
                </td>
                <td className="py-3 px-4 border">
                  {isEditing === product.id ? (
                    <input
                      type="date"
                      name="stockUpdatedDate"
                      value={editFormData.stockUpdatedDate}
                      onChange={handleInputChange}
                      className="border px-2 py-1 rounded"
                    />
                  ) : (
                    product.stockUpdatedDate.toLocaleDateString()
                  )}
                </td>
                <td className="py-3 px-4 flex justify-center gap-3 bg-gray-100">
                  {isEditing === product.id ? (
                    <button
                      onClick={handleSaveClick}
                      className="text-green-500 hover:text-green-700"
                    >
                      <FaSave />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditClick(product)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                  )}
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(product.id)}
                  >
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
          className="px-3 py-1```javascript
        rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
