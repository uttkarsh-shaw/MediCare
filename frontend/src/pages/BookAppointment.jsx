import { useState } from "react";

import { useParams }
from "react-router-dom";

import toast
from "react-hot-toast";

const BookAppointment = () => {

  const { doctorId } =
    useParams();


  const [formData, setFormData] =
    useState({

      appointmentDate: "",

      appointmentTime: "",

    });


  // HANDLE CHANGE
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });
  };


  // HANDLE SUBMIT
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const userInfo =
          JSON.parse(

            localStorage.getItem(
              "userInfo"
            )

          );


        const response =
          await fetch(

            "https://medicare-wiyz.onrender.com/api/appointments/book",

            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${userInfo.token}`,

              },

              body: JSON.stringify({

                doctorId,

                appointmentDate:
                  formData.appointmentDate,

                appointmentTime:
                  formData.appointmentTime,

              }),

            }

          );


        const data =
          await response.json();

        console.log(data);


        // ERROR
        if (!response.ok) {

          toast.error(
            data.message
          );

          return;
        }


        // SUCCESS
        toast.success(
          "Appointment Booked Successfully"
        );


        setTimeout(() => {

          window.location.href =
            "/doctors";

        }, 1000);

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
      bg-gray-100
      flex
      items-center
      justify-center
      p-6
    ">

      <form

        onSubmit={handleSubmit}

        className="
          bg-white
          p-8
          rounded-2xl
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

          Book Appointment 📅

        </h1>


        {/* DATE */}
        <input

          type="date"

          name="appointmentDate"

          value={
            formData.appointmentDate
          }

          onChange={handleChange}

          className="
            w-full
            border
            p-3
            rounded-lg
            mb-4
          "

          required
        />


        {/* TIME */}
        <input

          type="time"

          name="appointmentTime"

          value={
            formData.appointmentTime
          }

          onChange={handleChange}

          className="
            w-full
            border
            p-3
            rounded-lg
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
            py-3
            rounded-lg
          "
        >

          Confirm Appointment

        </button>

      </form>

    </div>
  );
};

export default BookAppointment;