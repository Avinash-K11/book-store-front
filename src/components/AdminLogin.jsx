import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import getBaseURL from "../utils/baseURL";

const AdminLogin = () => {
  const [message, setMessage] = useState("");

  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${getBaseURL()}/api/auth/admin`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const auth = response.data;
      if (auth.token) {
        localStorage.setItem("token", auth.token);
        setTimeout(() => {
          localStorage.removeItem("token");
          Swal.fire({
            position: "top-end",
            icon: "info",
            title: "Admin Login Expired, Login Again!!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        }, 3600 * 1000);
      }
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Admin Login Successful!!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
      setMessage("Enter Valid Email And Password");
    }
  };
  return (
    <div>
      <div className="h-screen flex justify-center items-center">
        <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-lg font-semibold mb-4">Admin Dashboard Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
                {...register("username", { required: true })}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
                {...register("password", { required: true })}
              />
            </div>
            {message && (
              <p className="text-red-500 text-xs italic mb-3">{message}</p>
            )}
            <div className="w-full">
              <button
                type="submit"
                className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-8 
              rounded focus:outline-none"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-5 text-center text-gray-500 text-sm">
            ©2025 Book Store. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
