import React, { useState } from "react";

const convertCMYKtoRGB = (c, m, y, k) => {
  const r = 255 * (1 - c / 100) * (1 - k / 100);
  const g = 255 * (1 - m / 100) * (1 - k / 100);
  const b = 255 * (1 - y / 100) * (1 - k / 100);
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
};
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
    size: "",
    color: "#000000",
    offerPrice: "",
    offerPercentage: "",
    cmykColor: { c: 0, m: 0, y: 0, k: 0 },
    photo: null,
  });

  const [reviewMode, setReviewMode] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // const categories = [
  //   "Tshirt",
  //   "Shirt",
  //   "Polo",
  //   "Oversized",
  //   "Jacket",
  //   "Hoodie",
  // ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleCMYKChange = (e) => {
    const { name, value } = e.target;
    const newCMYK = { ...productData.cmykColor, [name]: Number(value) };
    const newColor = convertCMYKtoRGB(
      newCMYK.c,
      newCMYK.m,
      newCMYK.y,
      newCMYK.k
    );
    setProductData({
      ...productData,
      cmykColor: newCMYK,
      color: newColor,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Get all selected files
    setProductData((prevData) => ({
      ...prevData,
      photos: files, // Save all files in an array
    }));
    setImagePreview(files.map((file) => URL.createObjectURL(file))); // Generate previews for each file
  };

  const handleReview = () => {
    setReviewMode(true);
  };

  const handleUpload = () => {
    // Your upload logic here (e.g., API call)
    console.log("Product uploaded:", productData);
    alert("Product uploaded successfully!");
  };

  return (
    <div className="min-h-screen w-full  bg-gray-100 mt-14 p-8">
      <h1 className="text-3xl font-bold mb-6">Product Upload</h1>
      <div className="rounded-lg w-full gap-5 grid grid-cols-1 md:grid-cols-2">
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
          <input
            type="text"
            name="brand"
            value={productData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter product category"
          />
        </div>
        {/* <div>
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
        </div> */}

        <div>
          <label className="font-semibold">Tag</label>
          <input
            type="text"
            name="size"
            value={productData.tag}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter product tag"
          />
        </div>

        <div>
          <label className="font-semibold">Collection</label>
          <input
            type="text"
            name="size"
            value={productData.collection}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter product collection"
          />
        </div>
        <div>
          <label className="font-semibold">Product Size</label>
          <select
            name="size"
            value={productData.size}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="">Select size</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
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
          <label className="font-semibold">Offer Price</label>
          <input
            type="number"
            name="offerPrice"
            value={productData.offerPrice}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter offer price"
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
          <label className="font-semibold">Offer Percentage</label>
          <input
            type="text"
            name="offerPercentage"
            value={productData.offerPercentage}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter offer percentage"
          />
        </div>

        <div>
          <label className="font-semibold">Product Color (CMYK)</label>
          <div className="flex items-baseline space-x-2">
            <div>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="c"
                  value={productData.cmykColor.c}
                  onChange={handleCMYKChange}
                  className="w-16 px-2 py-1 border rounded"
                  placeholder="C"
                  min="0"
                  max="100"
                />
                <input
                  type="number"
                  name="m"
                  value={productData.cmykColor.m}
                  onChange={handleCMYKChange}
                  className="w-16 px-2 py-1 border rounded"
                  placeholder="M"
                  min="0"
                  max="100"
                />
                <input
                  type="number"
                  name="y"
                  value={productData.cmykColor.y}
                  onChange={handleCMYKChange}
                  className="w-16 px-2 py-1 border rounded"
                  placeholder="Y"
                  min="0"
                  max="100"
                />
                <input
                  type="number"
                  name="k"
                  value={productData.cmykColor.k}
                  onChange={handleCMYKChange}
                  className="w-16 px-2 py-1 border rounded"
                  placeholder="K"
                  min="0"
                  max="100"
                />
              </div>
            </div>
            <div className="grow">
              <input
                type="text"
                value={productData.color}
                readOnly
                className="mt-2 w-full px-4 py-2 border rounded"
                placeholder="Converted RGB Value"
              />
            </div>
          </div>
        </div>
        <div>
          <label className="font-semibold">Product Photos(Multiple)</label>
          <input
            type="file"
            name="photos"
            multiple
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
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
            <strong>Brand:</strong> {productData.brand}
          </p>

          <p>
            <strong>Collection:</strong> {productData.collection}
          </p>

          <p>
            <strong>Tag:</strong> {productData.tag}
          </p>
          <p>
            <strong>Category:</strong> {productData.category}
          </p>

          <p>
            <strong>Stock:</strong> {productData.stock}
          </p>

          <p>
            <strong>Price:</strong> Rs.{productData.price}
          </p>
          <p>
            <strong>Offer Price:</strong> Rs.{productData.offerPrice}
          </p>

          <p>
            <strong>Rating:</strong> {productData.rating}
          </p>

          <p>
            <strong>Offer Percentage</strong> {productData.offerPercentage}
          </p>

          <p>
            <strong>Color:</strong>
            <span
              style={{
                backgroundColor: productData.color,
                padding: "5px 10px",
                borderRadius: "5px",
                color: "#fff",
              }}
            >
              {productData.color}
            </span>
          </p>
          <p>
            <strong>Description:</strong> {productData.description}
          </p>
          {imagePreview && imagePreview.length > 0 && (
            <div>
              <strong>Photos:</strong>
              <div className="mt-2 flex flex-wrap gap-2">
                {imagePreview.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Product Preview ${index + 1}`}
                    className="w-32 h-32 object-cover"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductUpload;
