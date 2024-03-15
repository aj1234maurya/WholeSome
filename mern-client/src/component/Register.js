import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import { useTheme } from "./ThemeContext";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
  });
  const { theme } = useTheme();
  const navigate = useNavigate();

  const notify = () => toast("Registered Successfully!");
  // const notify2 = () => toast("already!");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (formData.password && !passwordRegex.test(formData.password)) {
      newErrors.password = (
        <div>
          Password must meet the following criteria:
          <br />
          - At least 8 characters
          <br />
          - At least one number
          <br />
          - At least one uppercase letter
          <br />
          - At least one lowercase letter
          <br />- At least one special character (!@#$%^&*)
        </div>
      );
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/register",
          formData,
          { withCredentials: true }
        );
        if (response.status === 201) {
          console.log(response.status);
          notify();
          setTimeout(async () => {
            await axios.post("http://localhost:5000/api/logout", null, {
              withCredentials: true,
            });
            navigate("/");
          }, 1000);
        }
      } catch (error) {
        if (error.response.data.error) {
          // console.log(error.response);
          // console.log(error.response.data.error);
          toast.error(error.response.data.error);
          // notify2();
        } else {
          console.error(error);
        }
      }
    }
  }

  return (
    <>
      <div>
        <Navbar />
        {/* <div className="d-flex align-items-center justify-content-center loginBackground"> */}
        <div
          className={`d-flex align-items-center justify-content-center loginBackground ${
            theme === "dark" ? "dark-login" : "light-login"
          }`}
        >
          <div className="container loginDiv">
            <h1>Register</h1>
            <form
              className="needs-validation"
              noValidate
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter Name"
                  required
                  className={`form-control ${errors.name && "is-invalid"}`}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  placeholder="Enter Email"
                  type="email"
                  required
                  className={`form-control ${errors.email && "is-invalid"}`}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  placeholder="Enter Password"
                  type="password"
                  className={`form-control ${errors.password && "is-invalid"}`}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>

              <div className="bottom-text">
                <p>
                  Already have an account? <Link to="/">Login</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
