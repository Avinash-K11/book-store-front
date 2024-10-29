import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [message, setMessage] = useState("");

  const { register, handleSubmit } = useForm();

  const { loginUser, signWithGoogle } = useAuth();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User Logged In Successfully!!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setMessage("Enter Valid Email And Password");
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await signWithGoogle();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successfully!!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      console.log(error.message);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Google Signin Failed!!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-lg font-semibold mb-4">Please Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
              {...register("email", { required: true })}
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
          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 
              rounded focus:outline-none"
            >
              Login
            </button>
          </div>
        </form>
        <p className="align-baseline font-medium mt-4 text-sm">
          Haven't Registered ? Please{" "}
          <Link to="/register" className="text-blue-500 hover:text-blue-700">
            Register
          </Link>
        </p>
        {/* Google Sign In */}
        <div className="mt-4">
          <button
            onClick={handleGoogleSignin}
            className="w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
          >
            <FaGoogle />
            Sign in with Google
          </button>
        </div>

        <p className="mt-5 text-center text-gray-500 text-sm">
          ©2025 Book Store. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
