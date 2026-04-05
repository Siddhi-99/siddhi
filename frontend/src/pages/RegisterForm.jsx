import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const RegistrationForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const clubName = queryParams.get("club") || "Selected Club";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    year: "",
    class: "",
    resume: null,
    reason: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("✅ Registration Successful!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">
          Register for {clubName}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Student Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          >
            <option value="">Select Year</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>
          <input
            type="text"
            placeholder="Class"
            name="class"
            value={formData.class}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
          <div>
            <label className="block text-gray-600 font-semibold mb-1">
              Upload Resume
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>
          <textarea
            placeholder="Why should we take you?"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          ></textarea>
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => alert("Registration Cancelled")}
              className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
