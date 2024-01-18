import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmployeeForm = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    salary: '',
  });

  const navigate = useNavigate();

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8080/employee', formData);

      // Handle the response as needed (e.g., show success message, update state)
      console.log('API Response:', response.data);

      navigate('/');

    } catch (error) {
      // Handle errors (e.g., show error message)
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="w-50 container mt-5">
      <h2>Add Employee</h2>
      <form className="border border-dark p-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="salary" className="form-label">
            Salary
          </label>
          <input
            type="text"
            className="form-control"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="w-50 btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
