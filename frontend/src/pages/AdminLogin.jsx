import { useState } from "react";

import { useNavigate }
from "react-router-dom";

import { useAuth }
from "../context/AuthContext";

const AdminLogin = () => {

  const navigate = useNavigate();

  const { setUserInfo } =
    useAuth();

  const [formData, setFormData] =
    useState({

      email: "",

      password: "",

    });

  const [message, setMessage] =
    useState("");


  // HANDLE CHANGE
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value,

    });

  };


  // HANDLE SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(

        "https://medicare-wiyz.onrender.com/api/auth/admin-login",

        {
          method: "POST",

          headers: {

            "Content-Type":
            "application/json",

          },

          body:
          JSON.stringify(formData),

        }

      );

      const data =
      await response.json();


      // ERROR
      if (!response.ok) {

        setMessage(data.message);

        return;

      }


      // SAVE ADMIN
      const adminData = data;

      localStorage.setItem(

        "userInfo",

        JSON.stringify(adminData)

      );

      setUserInfo(adminData);


      // REDIRECT
      navigate("/admin-dashboard");


    } catch (error) {

      console.log(error);

      setMessage(
        "Something Went Wrong"
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
        "
      >

        <h1 className="
          text-3xl
          font-bold
          text-center
          text-blue-700
          mb-6
        ">

          Admin Login 🔐

        </h1>


        {/* EMAIL */}
        <input

          type="email"

          name="email"

          placeholder="Admin Email"

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

          placeholder="Admin Password"

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
            mb-6
            text-black
            placeholder:text-gray-500
          "

          required
        />


        {/* BUTTON */}
        <button

          type="submit"

          className="
            w-full
            bg-blue-700
            text-white
            py-3
            rounded-2xl
            hover:bg-blue-800
            transition
            font-semibold
          "
        >

          Login

        </button>


        {/* MESSAGE */}
        {message && (

          <p className="
            text-center
            mt-4
            font-semibold
            text-red-600
          ">

            {message}

          </p>

        )}

      </form>

    </div>

  );
};

export default AdminLogin;