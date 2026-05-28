import { useState } from "react";

import { useNavigate }
from "react-router-dom";

import toast
from "react-hot-toast";

import {
  registerUser
} from "../services/authService";

const Register = () => {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({

      name: "",

      email: "",

      password: "",

      role: "patient",

    });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const data =
          await registerUser(
            formData
          );

        console.log(data);

        // SUCCESS TOAST
        toast.success(
          "Registration Successful"
        );

        // REDIRECT
        setTimeout(() => {

          navigate("/login");

        }, 1500);

      } catch (error) {

        // ERROR TOAST
        toast.error(
          "Registration Failed"
        );

      }
    };

  return (

    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-100
      px-4
      py-10
    ">

      <form

        onSubmit={handleSubmit}

        className="
          bg-white
          p-8
          rounded-3xl
          shadow-xl
          w-full
          max-w-md
          mx-auto
        "
      >

        {/* HEADING */}
        <div className="
          text-center
          mb-8
        ">

          <h1 className="
            text-4xl
            font-bold
            text-blue-700
            mb-2
          ">

            Create Account

          </h1>

          <p className="
            text-gray-500
          ">

            Register to start your
            healthcare journey.

          </p>

        </div>

        {/* NAME */}
        <input

          type="text"

          name="name"

          placeholder="Enter Name"

          value={formData.name}

          onChange={handleChange}

          className="
            w-full
            border
            border-gray-300
            focus:border-blue-500
            outline-none
            p-4
            rounded-2xl
            mb-5
            text-black
            placeholder:text-gray-500
          "

          required
        />

        {/* EMAIL */}
        <input

          type="email"

          name="email"

          placeholder="Enter Email"

          value={formData.email}

          onChange={handleChange}

          className="
            w-full
            border
            border-gray-300
            focus:border-blue-500
            outline-none
            p-4
            rounded-2xl
            mb-5
            text-black
            placeholder:text-gray-500
          "

          required
        />

        {/* PASSWORD */}
        <input

          type="password"

          name="password"

          placeholder="Enter Password"

          value={formData.password}

          onChange={handleChange}

          className="
            w-full
            border
            border-gray-300
            focus:border-blue-500
            outline-none
            p-4
            rounded-2xl
            mb-5
            text-black
            placeholder:text-gray-500
          "

          required
        />

        {/* ROLE */}
        <select

          name="role"

          value={formData.role}

          onChange={handleChange}

          className="
            w-full
            border
            border-gray-300
            focus:border-blue-500
            outline-none
            p-4
            rounded-2xl
            mb-6
            text-black
          "
        >

          <option value="patient">
            Patient
          </option>

          <option value="doctor">
            Doctor
          </option>

          <option value="pharmacy">
            Pharmacy
          </option>

        </select>

        {/* BUTTON */}
        <button

          type="submit"

          className="
            w-full
            bg-blue-700
            text-white
            py-4
            rounded-2xl
            hover:bg-blue-800
            transition-all
            duration-300
            font-semibold
          "
        >

          Register

        </button>

      </form>

    </div>

  );
};

export default Register;