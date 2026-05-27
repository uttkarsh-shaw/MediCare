import { useState } from "react";

import { useNavigate }
from "react-router-dom";

import { useAuth }
from "../context/AuthContext";

import toast
from "react-hot-toast";



const Login = () => {

  const [formData, setFormData] =
    useState({

      email: "",

      password: "",

    });




  const { setUserInfo } =
    useAuth();

  const navigate =
    useNavigate();




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




        // LOGIN API
        const response =
          await fetch(

            "http://localhost:5000/api/auth/login",

            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/json",

              },

              body: JSON.stringify(
                formData
              ),

            }

          );




        const data =
          await response.json();

        console.log(data);




        // LOGIN FAILED
        if (!response.ok) {

          toast.error(
            data.message
          );

          return;

        }




        // SUCCESS TOAST
        toast.success(
          "Login Successful"
        );




        // SAVE USER
        localStorage.setItem(

          "userInfo",

          JSON.stringify(data)

        );




        setUserInfo(data);




        // =========================
        // ADMIN FLOW
        // =========================

        if (
          data.role === "admin"
        ) {

          navigate(
            "/admin-dashboard"
          );

          return;

        }




        // =========================
        // DOCTOR FLOW
        // =========================

        if (
          data.role === "doctor"
        ) {

          try {




            // CHECK PROFILE
            const profileResponse =
              await fetch(

                "http://localhost:5000/api/doctors/my-profile",

                {

                  headers: {

                    Authorization:
                      `Bearer ${data.token}`,

                  },

                }

              );




            // PROFILE EXISTS
            if (
              profileResponse.ok
            ) {

              navigate(
                "/dashboard"
              );

            }




            // PROFILE NOT EXISTS
            else {

              navigate(

                "/create-doctor-profile"

              );

            }

          } catch (error) {

            navigate(

              "/create-doctor-profile"

            );

          }

        }




        // =========================
        // PATIENT FLOW
        // =========================

        else {

          navigate(
            "/health-info"
          );

        }

      } catch (error) {

        console.log(error);

        toast.error(
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




        {/* HEADING */}
        <div className="
          text-center
          mb-8
        ">

          <h2 className="
            text-4xl
            font-bold
            text-blue-700
            mb-2
          ">

            Welcome Back 👋

          </h2>




          <p className="
            text-gray-500
          ">

            Login to continue your
            healthcare journey.

          </p>

        </div>





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
            mb-6
          "

          required
        />





        {/* BUTTON */}
        <button

          type="submit"

          className="
            w-full
            bg-blue-700
            hover:bg-blue-800
            text-white
            py-4
            rounded-2xl
            font-semibold
            transition-all
            duration-300
          "
        >

          Login

        </button>

      </form>

    </div>
  );
};



export default Login;