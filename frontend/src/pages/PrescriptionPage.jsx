import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import PrescriptionForm
from "../components/PrescriptionForm";

import VideoCallButton
from "../components/VideoCallButton";



const PrescriptionPage = () => {

  const { appointmentId } =
    useParams();



  const [appointment,
    setAppointment] =
    useState(null);




  // FETCH APPOINTMENT DETAILS
  const fetchAppointmentDetails =
    async () => {

      try {

        const userInfo = JSON.parse(

          localStorage.getItem(
            "userInfo"
          )

        );



        const response = await fetch(

          `http://localhost:5000/api/appointments/${appointmentId}`,

          {

            headers: {

              Authorization:
                `Bearer ${userInfo.token}`,

            },

          }

        );



        const data =
          await response.json();

        console.log(data);

        setAppointment(data);

      } catch (error) {

        console.log(error);

      }
    };




  useEffect(() => {

    fetchAppointmentDetails();

  }, []);




  // LOADING
  if (!appointment) {

    return (

      <div className="
        min-h-screen
        flex
        items-center
        justify-center
        text-3xl
        font-bold
      ">

        Loading...

      </div>

    );
  }




  return (

    <div className="
      min-h-screen
      bg-gray-100
      p-8
    ">

      <div className="
        max-w-5xl
        mx-auto
        bg-white
        rounded-2xl
        shadow-lg
        p-8
      ">




        {/* HEADING */}
        <div className="mb-10">

          <h1 className="
            text-4xl
            font-bold
            text-blue-700
            mb-2
          ">

            Prescription Page 💊

          </h1>



          <p className="
            text-gray-600
          ">

            Add medicines, advice and tests
            for this patient.

          </p>

        </div>




        {/* PATIENT DETAILS */}
        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-y-8
          gap-x-10
          mb-10
        ">




          {/* PATIENT NAME */}
          <div>

            <p className="
              text-gray-500
              text-sm
              mb-1
            ">

              Patient Name

            </p>



            <h2 className="
              text-2xl
              font-bold
              text-gray-800
            ">

              {
                appointment.patient.name
              }

            </h2>

          </div>





          {/* EMAIL */}
          <div>

            <p className="
              text-gray-500
              text-sm
              mb-1
            ">

              Email

            </p>



            <h2 className="
              text-xl
              font-semibold
              text-gray-800
              break-all
            ">

              {
                appointment.patient.email
              }

            </h2>

          </div>





          {/* APPOINTMENT DATE */}
          <div>

            <p className="
              text-gray-500
              text-sm
              mb-1
            ">

              Appointment Date

            </p>



            <h2 className="
              text-xl
              font-semibold
              text-gray-800
              mb-4
            ">

              {
                appointment.appointmentDate
              }

            </h2>




            {/* STATUS */}
            <span className={`
              inline-block
              px-5
              py-2
              rounded-full
              text-white
              font-semibold

              ${appointment.status === "approved"

                ? "bg-green-500"

                : appointment.status === "completed"

                ? "bg-blue-600"

                : appointment.status === "cancelled"

                ? "bg-red-500"

                : "bg-yellow-500"}
            `}>

              {appointment.status}

            </span>

          </div>





          {/* TIME + VIDEO CALL */}
          <div>

            <p className="
              text-gray-500
              text-sm
              mb-1
            ">

              Appointment Time

            </p>



            <h2 className="
              text-xl
              font-semibold
              text-gray-800
              mb-4
            ">

              {
                appointment.appointmentTime
              }

            </h2>




            {/* VIDEO CALL BUTTON */}
            {(appointment.paymentStatus === "paid" ||
              appointment.status === "completed") && (

              <VideoCallButton
                appointment={appointment}
              />

            )}

          </div>

        </div>




        {/* PRESCRIPTION FORM */}
        <div className="
          bg-gray-50
          rounded-2xl
          p-8
          border
        ">

          <h2 className="
            text-3xl
            font-bold
            text-blue-700
            mb-6
          ">

            Add Prescription ✍️

          </h2>




          <PrescriptionForm

            appointmentId={
              appointment._id
            }

            fetchAppointments={
              fetchAppointmentDetails
            }

          />

        </div>

      </div>

    </div>
  );
};



export default PrescriptionPage;