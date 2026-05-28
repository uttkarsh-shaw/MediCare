import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import DoctorProfileCard
from "../components/DoctorProfileCard";

import AppointmentCards
from "../components/AppointmentCards";


const DoctorDashboard = () => {

  const [doctor, setDoctor] =
    useState(null);


  const [appointments,
    setAppointments] =
    useState([]);


  const [editMode,
    setEditMode] =
    useState(false);


  const [timings,
    setTimings] =
    useState("");


  const [consultationFee,
    setConsultationFee] =
    useState("");


  const [availability,
    setAvailability] =
    useState(true);


  // IMAGE STATE
  const [image,
    setImage] =
    useState(null);


  // FETCH PROFILE
  const fetchDoctorProfile =
    async () => {

      try {

        const userInfo =
          JSON.parse(

            localStorage.getItem(
              "userInfo"
            )

          );


        const response =
          await fetch(

            "https://medicare-wiyz.onrender.com/api/doctors/my-profile",

            {

              headers: {

                Authorization:
                  `Bearer ${userInfo.token}`,

              },

            }

          );


        const data =
          await response.json();


        setDoctor(data);

        setTimings(
          data.timings
        );

        setConsultationFee(
          data.consultationFee
        );

        setAvailability(
          data.availability
        );

      } catch (error) {

        console.log(error);

      }
    };


  // FETCH APPOINTMENTS
  const fetchAppointments =
    async () => {

      try {

        const userInfo =
          JSON.parse(

            localStorage.getItem(
              "userInfo"
            )

          );


        const response =
          await fetch(

            "https://medicare-wiyz.onrender.com/api/appointments/doctor",

            {

              headers: {

                Authorization:
                  `Bearer ${userInfo.token}`,

              },

            }

          );


        const data =
          await response.json();

        setAppointments(data);

      } catch (error) {

        console.log(error);

      }
    };


  useEffect(() => {

    fetchDoctorProfile();

    fetchAppointments();

  }, []);


  // UPDATE STATUS
  const updateStatus =
    async (id, status) => {

      try {

        const userInfo =
          JSON.parse(

            localStorage.getItem(
              "userInfo"
            )

          );


        await fetch(

          `https://medicare-wiyz.onrender.com/api/appointments/status/${id}`,

          {

            method: "PUT",

            headers: {

              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${userInfo.token}`,

            },

            body: JSON.stringify({

              status,

            }),

          }

        );


        fetchAppointments();

      } catch (error) {

        console.log(error);

      }
    };


  // UPDATE PROFILE
  const updateProfile =
    async () => {

      try {

        const userInfo =
          JSON.parse(

            localStorage.getItem(
              "userInfo"
            )

          );


        // FORMDATA
        const formData =
          new FormData();


        formData.append(
          "timings",
          timings
        );


        formData.append(
          "consultationFee",
          consultationFee
        );


        formData.append(
          "availability",
          availability
        );


        // IMAGE
        if (image) {

          formData.append(
            "image",
            image
          );

        }


        const response =
          await fetch(

            "https://medicare-wiyz.onrender.com/api/doctors/update-profile",

            {

              method: "PUT",

              headers: {

                Authorization:
                  `Bearer ${userInfo.token}`,

              },

              body: formData,

            }

          );


        const data =
          await response.json();

        console.log(data);


        // SUCCESS TOAST
        toast.success(
          "Profile Updated Successfully"
        );


        fetchDoctorProfile();

        setEditMode(false);

        setImage(null);

      } catch (error) {

        console.log(error);

        // ERROR TOAST
        toast.error(
          "Update Failed"
        );

      }
    };


  // LOADING
  if (!doctor) {

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
      p-6
    ">

      <div className="
        max-w-7xl
        mx-auto
      ">

        {/* HEADING */}
        <div className="mb-10">

          <h1 className="
            text-4xl
            font-bold
            text-blue-700
          ">

            Doctor Dashboard 👨‍⚕️

          </h1>

          <p className="
            text-gray-600
            mt-2
          ">

            Manage your profile and appointments

          </p>

        </div>


        {/* PROFILE CARD */}
        <DoctorProfileCard

          doctor={doctor}

          editMode={editMode}

          setEditMode={setEditMode}

          timings={timings}

          setTimings={setTimings}

          consultationFee={consultationFee}

          setConsultationFee={
            setConsultationFee
          }

          availability={availability}

          setAvailability={
            setAvailability
          }

          updateProfile={updateProfile}

          image={image}

          setImage={setImage}

        />


        {/* APPOINTMENT CARDS */}
        <AppointmentCards

          appointments={appointments}

          updateStatus={updateStatus}

          fetchAppointments={
            fetchAppointments
          }

        />

      </div>

    </div>
  );
};

export default DoctorDashboard;