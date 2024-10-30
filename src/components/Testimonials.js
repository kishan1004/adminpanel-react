import React, { useState } from "react";

const testimonialsData = [
  {
    id: 1,
    customerName: "Alice",
    review: "Great product! Highly recommend.",
  },
  {
    id: 2,
    customerName: "Bob",
    review: "Excellent customer service and fast shipping.",
  },
  {
    id: 3,
    customerName: "Charlie",
    review: "The quality is outstanding! Will buy again.",
  },
  {
    id: 4,
    customerName: "David",
    review: "Very satisfied with my purchase.",
  },
  {
    id: 5,
    customerName: "Eva",
    review: "Amazing experience! Will definitely recommend.",
  },
  {
    id: 6,
    customerName: "Alice",
    review: "Great product! Highly recommend.",
  },
  {
    id: 7,
    customerName: "Bob",
    review: "Excellent customer service and fast shipping.",
  },
  {
    id: 8,
    customerName: "Charlie",
    review: "The quality is outstanding! Will buy again.",
  },
  {
    id: 9,
    customerName: "David",
    review: "Very satisfied with my purchase.",
  },
  {
    id: 10,
    customerName: "Eva",
    review: "Amazing experience! Will definitely recommend.",
  },
  // Add more testimonials as needed
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 8;
  const totalItems = testimonialsData.length;

  const handleNext = () => {
    if (currentIndex < Math.floor(totalItems / itemsPerPage)) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const displayedTestimonials = testimonialsData.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full mt-[60px]">
      <h1 className="text-2xl font-bold mb-6">Customer Testimonials</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {displayedTestimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white p-4 border rounded shadow-md transition-transform transform hover:scale-105"
          >
            <h3 className="font-semibold">{testimonial.customerName}</h3>
            <p className="text-gray-600">{testimonial.review}</p>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`px-4 py-2 rounded ${
            currentIndex === 0 ? "bg-gray-300" : "bg-black text-white"
          } `}
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex >= Math.floor(totalItems / itemsPerPage)}
          className={`px-4 py-2 rounded ${
            currentIndex >= Math.floor(totalItems / itemsPerPage)
              ? "bg-gray-300"
              : "bg-black text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
