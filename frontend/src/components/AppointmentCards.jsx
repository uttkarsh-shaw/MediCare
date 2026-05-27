import { useNavigate } from "react-router-dom";



const AppointmentCards = ({

  appointments,

  updateStatus,

  fetchAppointments,

}) => {

  const navigate =
    useNavigate();



  return (

    <div>

      <div className="
        flex
        items-center
        justify-between
        mb-8
      ">

        <h2 className="
          text-3xl
          font-bold
          text-blue-700
        ">

          Patient Appointments 📅

        </h2>



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

            No Appointments Yet 🚀

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

              className="
                bg-white
                rounded-2xl
                shadow-lg
                p-6
                hover:shadow-2xl
                transition-all
                duration-300
                border
                border-gray-100
              "
            >




              {/* PATIENT INFO */}
              <div className="
                flex
                items-center
                gap-4
                mb-6
              ">




                {/* PREMIUM AVATAR */}
                <div
                  className="
                    w-16
                    h-16
                    rounded-full
                    bg-gradient-to-r
                    from-blue-500
                    to-cyan-500
                    flex
                    items-center
                    justify-center
                    shadow-lg
                  "
                >

                  <span
                    className="
                      text-white
                      text-2xl
                      font-bold
                    "
                  >

                    {
                      appointment.patient.name
                        ?.charAt(0)
                        ?.toUpperCase()
                    }

                  </span>

                </div>





                {/* PATIENT DETAILS */}
                <div>

                  <h3 className="
                    text-xl
                    font-bold
                    text-gray-800
                  ">

                    {
                      appointment.patient.name
                    }

                  </h3>



                  <p className="
                    text-gray-500
                    text-sm
                    break-all
                  ">

                    {
                      appointment.patient.email
                    }

                  </p>

                </div>

              </div>





              {/* DETAILS */}
              <div className="
                space-y-4
              ">




                {/* DATE */}
                <div className="
                  flex
                  justify-between
                  items-center
                ">

                  <span className="
                    text-gray-500
                    font-medium
                  ">

                    Date

                  </span>



                  <span className="
                    font-semibold
                    text-gray-800
                  ">

                    {
                      appointment.appointmentDate
                    }

                  </span>

                </div>





                {/* TIME */}
                <div className="
                  flex
                  justify-between
                  items-center
                ">

                  <span className="
                    text-gray-500
                    font-medium
                  ">

                    Time

                  </span>



                  <span className="
                    font-semibold
                    text-gray-800
                  ">

                    {
                      appointment.appointmentTime
                    }

                  </span>

                </div>





                {/* STATUS */}
                <div className="
                  flex
                  justify-between
                  items-center
                ">

                  <span className="
                    text-gray-500
                    font-medium
                  ">

                    Status

                  </span>



                  <span className={`
                    px-4
                    py-1
                    rounded-full
                    text-sm
                    font-semibold
                    text-white

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





                {/* BUTTONS */}
                <div className="
                  flex
                  gap-3
                  mt-6
                  flex-wrap
                ">




                  {/* APPROVE */}
                  <button

                    onClick={() =>
                      updateStatus(
                        appointment._id,
                        "approved"
                      )
                    }

                    className="
                      w-11
                      h-11
                      rounded-full
                      bg-green-100
                      hover:bg-green-500
                      text-green-600
                      hover:text-white
                      text-xl
                      font-bold
                      transition-all
                      duration-300
                      flex
                      items-center
                      justify-center
                    "
                  >

                    ✓

                  </button>





                  {/* REJECT */}
                  <button

                    onClick={() =>
                      updateStatus(
                        appointment._id,
                        "cancelled"
                      )
                    }

                    className="
                      w-11
                      h-11
                      rounded-full
                      bg-red-100
                      hover:bg-red-500
                      text-red-600
                      hover:text-white
                      text-xl
                      font-bold
                      transition-all
                      duration-300
                      flex
                      items-center
                      justify-center
                    "
                  >

                    ✕

                  </button>





                  {/* VIEW DETAILS */}
                  <button

                    onClick={() =>

                      navigate(

                        `/prescription/${appointment._id}`

                      )

                    }

                    className="
                      bg-blue-600
                      hover:bg-blue-700
                      text-white
                      px-4
                      py-2
                      rounded-xl
                      font-semibold
                      transition
                    "
                  >

                    View Details

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );
};



export default AppointmentCards;