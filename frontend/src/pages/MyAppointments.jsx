import {

  useEffect,

  useState

} from "react";

import PatientAppointmentCard
from "../components/PatientAppointmentCard";



const MyAppointments = () => {

  const [appointments,
  setAppointments] = useState([]);

  const [loading,
  setLoading] = useState(true);




  // FETCH MY APPOINTMENTS
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

        "http://localhost:5000/api/appointments/my-appointments",

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

      setAppointments(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };




  // DELETE APPOINTMENT
  const deleteAppointment =
  async (id) => {

    try {

      const userInfo =
      JSON.parse(

        localStorage.getItem(
          "userInfo"
        )

      );



      await fetch(

        `http://localhost:5000/api/appointments/${id}`,

        {

          method: "DELETE",

          headers: {

            Authorization:
            `Bearer ${userInfo.token}`,

          },

        }

      );



      // REFRESH
      fetchAppointments();

    } catch (error) {

      console.log(error);

    }
  };




  useEffect(() => {

    fetchAppointments();

  }, []);




  // LOADING
  if (loading) {

    return (

      <div className="
        min-h-screen
        flex
        justify-center
        items-center
        text-2xl
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




      {/* HEADING */}
      <div className="
        flex
        items-center
        justify-between
        mb-8
      ">

        <h1 className="
          text-4xl
          font-bold
          text-blue-700
        ">

          My Appointments 📅

        </h1>




        <div className="
          bg-blue-100
          text-blue-700
          px-5
          py-2
          rounded-full
          font-semibold
        ">

          {appointments.length}
          {" "}
          Total

        </div>

      </div>





      {/* EMPTY */}
      {appointments.length === 0 ? (

        <div className="
          bg-white
          rounded-2xl
          shadow-lg
          p-10
          text-center
        ">

          <h2 className="
            text-2xl
            font-bold
            text-gray-700
          ">

            No Appointments Found 🚀

          </h2>

        </div>

      ) : (

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-8
        ">

          {appointments.map(
            (appointment) => (

              <div
                key={appointment._id}
                className="relative"
              >




                {/* DELETE BUTTON */}
                {appointment.status === "cancelled" && (

                  <button

                    onClick={() =>
                      deleteAppointment(
                        appointment._id
                      )
                    }

                    className="
                      absolute
                      top-3
                      right-3
                      z-10
                      text-gray-400
                      hover:text-red-500
                      text-sm
                      font-bold
                      transition
                    "
                  >

                    ✕

                  </button>

                )}




                <PatientAppointmentCard

                  appointment={appointment}

                />

              </div>

            )
          )}

        </div>

      )}

    </div>

  );
};

export default MyAppointments;