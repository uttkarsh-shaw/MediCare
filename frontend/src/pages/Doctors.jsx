import { useEffect, useState } from "react";

import {
  useNavigate
} from "react-router-dom";


const specializationDescriptions = {

  Cardiologist:
    "Treats heart-related diseases and conditions.",

  Physician:
    "General health specialist for common illnesses.",

  Dermatologist:
    "Treats skin, hair, and nail problems.",

  Neurologist:
    "Treats brain and nervous system disorders.",

  Pediatrician:
    "Specialist for child healthcare.",

};


const Doctors = () => {

  const navigate =
    useNavigate();


  const [doctors,
    setDoctors] =
    useState([]);


  const [loading,
    setLoading] =
    useState(true);


  // FETCH DOCTORS
  useEffect(() => {

    const fetchDoctors =
    async () => {

      try {

        const response =
        await fetch(

          "http://localhost:5000/api/doctors"

        );


        const data =
        await response.json();


        setDoctors(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };


    fetchDoctors();

  }, []);


  // LOADING
  if (loading) {

    return (

      <h1 className="
        text-center
        mt-10
        text-2xl
        font-bold
      ">

        Loading Doctors...

      </h1>

    );
  }


  return (

    <div className="
      min-h-screen
      bg-gray-100
      p-6
    ">

      {/* HEADING */}
      <h1 className="
        text-4xl
        font-bold
        text-center
        text-blue-700
        mb-10
      ">

        Available Doctors 👨‍⚕️

      </h1>


      {/* GRID */}
      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-8
      ">

        {doctors.map((doctor) => (

          <div

            key={doctor._id}

            className="
              bg-white
              rounded-2xl
              overflow-hidden
              border
              border-gray-200

              hover:shadow-xl
              hover:border-blue-300

              transition-all
              duration-300

              hover:scale-[1.02]
            "
          >

            {/* IMAGE */}
            <img

              src={

                doctor.image

                ||

                "https://cdn-icons-png.flaticon.com/512/3774/3774299.png"

              }

              alt="doctor"

              className="
                w-full
                h-52
                object-cover
              "
            />


            {/* CONTENT */}
            <div className="p-6">

              {/* NAME */}
              <h2 className="
                text-2xl
                font-bold
                text-blue-700
                mb-3
              ">

                {doctor.user.name}

              </h2>


              {/* SPECIALIZATION */}
              <p className="mb-2">

                <span className="
                  font-semibold
                ">

                  Specialization:

                </span>

                {" "}

                {doctor.specialization}

              </p>


              {/* EXPERIENCE */}
              <p className="mb-2">

                <span className="
                  font-semibold
                ">

                  Experience:

                </span>

                {" "}

                {doctor.experience} years

              </p>


              {/* FEE */}
              <p className="mb-2">

                <span className="
                  font-semibold
                ">

                  Fee:

                </span>

                {" "}

                ₹{doctor.consultationFee}

              </p>


              {/* TIMINGS */}
              <p className="mb-4">

                <span className="
                  font-semibold
                ">

                  Timings:

                </span>

                {" "}

                {doctor.timings}

              </p>


              {/* AVAILABILITY */}
              <div className="mb-5">

                <span className={`
                  px-4
                  py-1
                  rounded-full
                  text-white
                  text-sm
                  font-semibold

                  ${doctor.availability

                    ? "bg-green-600"

                    : "bg-red-600"

                  }
                `}>

                  {doctor.availability

                    ? "Available"

                    : "Unavailable"

                  }

                </span>

              </div>


              {/* SPECIALIZATION INFO */}
              <div className="
                bg-blue-50
                p-4
                rounded-xl
                mb-5
              ">

                <p className="
                  text-sm
                  text-gray-700
                ">

                  {

                    specializationDescriptions[
                      doctor.specialization
                    ]

                    ||

                    "Experienced medical specialist dedicated to quality patient care."

                  }

                </p>

              </div>


              {/* BUTTON */}
              <button

                onClick={() =>

                  navigate(

                    `/book-appointment/${doctor._id}`

                  )

                }

                className="
                  w-full
                  bg-blue-700
                  hover:bg-blue-800
                  text-white
                  py-3
                  rounded-xl
                  transition
                  font-semibold
                "
              >

                Book Appointment

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Doctors;