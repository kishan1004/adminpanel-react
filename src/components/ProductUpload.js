import React, { useState } from "react";

const ProductUpload = () => {
  const [productData, setProductData] = useState({
    name: "",
    id: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
    rating: "",
    description: "",
    photo: null,
  });
  const [reviewMode, setReviewMode] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const categories = [
    "Tshirt",
    "Shirt",
    "Polo",
    "Oversized",
    "Jacket",
    "Hoodie",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductData((prevData) => ({
      ...prevData,
      photo: file,
    }));
    setImagePreview(URL.createObjectURL(file)); // Create a URL for the image preview
  };

  const handleReview = () => {
    setReviewMode(true);
  };

  const handleUpload = () => {
    // Add your upload logic here (e.g., API call to upload the product)
    console.log("Product uploaded:", productData);
    alert("Product uploaded successfully!");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center mt-[60px]">
      <h1 className="text-2xl font-bold mb-6">Product Upload</h1>

      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-lg space-y-4">
        {/* Input Fields */}
        <div>
          <label className="font-semibold">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter product name"
          />
        </div>
        <div>
          <label className="font-semibold">Product ID</label>
          <input
            type="text"
            name="id"
            value={productData.id}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter product ID"
          />
        </div>
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter product description"
            rows="3"
          />
        </div>
        <div>
          <label className="font-semibold">Product Brand</label>
          <input
            type="text"
            name="brand"
            value={productData.brand}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter product brand"
          />
        </div>
        <div>
          <label className="font-semibold">Product Category</label>
          <select
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="" disabled>
              Select category
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-semibold">Product Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter product price"
          />
        </div>
        <div>
          <label className="font-semibold">Stock Count</label>
          <input
            type="number"
            name="stock"
            value={productData.stock}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter stock count"
          />
        </div>
        <div>
          <label className="font-semibold">Product Rating (1-5)</label>
          <input
            type="number"
            name="rating"
            value={productData.rating}
            onChange={handleChange}
            min="1"
            max="5"
            step="0.1"
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter product rating"
          />
        </div>
        <div>
          <label className="font-semibold">Product Photo</label>
          <input
            type="file"
            name="photo"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handleReview}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Review
          </button>
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Upload
          </button>
        </div>

        {/* Review Section */}
        {reviewMode && (
          <div className="mt-6 bg-gray-100 p-4 rounded">
            <h2 className="text-xl font-bold mb-2">Review Product Details</h2>
            <p>
              <strong>Name:</strong> {productData.name}
            </p>
            <p>
              <strong>ID:</strong> {productData.id}
            </p>
            <p>
              <strong>Description:</strong> {productData.description}
            </p>
            <p>
              <strong>Brand:</strong> {productData.brand}
            </p>
            <p>
              <strong>Category:</strong> {productData.category}
            </p>
            <p>
              <strong>Price:</strong> ${productData.price}
            </p>
            <p>
              <strong>Stock:</strong> {productData.stock}
            </p>
            <p>
              <strong>Rating:</strong> {productData.rating}
            </p>
            {imagePreview && (
              <div>
                <strong>Photo:</strong>
                <img
                  src={imagePreview}
                  alt="Product Preview"
                  className="mt-2 w-32 h-32 object-cover"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductUpload;
