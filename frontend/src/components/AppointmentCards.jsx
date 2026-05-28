import { useNavigate } from "react-router-dom";

const AppointmentCards = ({

  appointments,

  updateStatus,

  setAppointments,

}) => {

  const navigate =
    useNavigate();

  // APPROVE
  const handleApprove = (
    appointmentId
  ) => {

    // BACKEND UPDATE
    updateStatus(
      appointmentId,
      "approved"
    );

    // FRONTEND INSTANT UPDATE
    setAppointments(

      prev =>

        prev.map(item =>

          item._id ===
          appointmentId

            ?

            {
              ...item,
              status: "approved",
            }

            :

            item
        )

    );

  };

  // REJECT
  const handleReject = (
    appointmentId
  ) => {

    // BACKEND UPDATE
    updateStatus(
      appointmentId,
      "cancelled"
    );

    // FRONTEND INSTANT UPDATE
    setAppointments(

      prev =>

        prev.map(item =>

          item._id ===
          appointmentId

            ?

            {
              ...item,
              status: "cancelled",
            }

            :

            item
        )

    );

  };

  // REMOVE CARD ONLY FROM UI
  const handleRemoveCard = (
    appointmentId
  ) => {

    setAppointments(

      prev =>

        prev.filter(

          item =>

            item._id !==
            appointmentId
        )

    );

  };

  return (

    <div className="w-full">

      {/* HEADER */}
      <div className="
        flex
        items-center
        justify-between
        mb-8
        flex-wrap
        gap-4
      ">

        <div>

          <h1 className="
            text-3xl
            font-bold
            text-blue-700
          ">

            Patient Appointments

          </h1>

          <p className="
            text-gray-500
            mt-1
          ">

            Manage and review patient appointments

          </p>

        </div>

        <div className="
          bg-blue-100
          text-blue-700
          px-5
          py-2
          rounded-full
          font-semibold
          text-sm
        ">

          {appointments.length}
          {" "}
          Total Appointments

        </div>

      </div>

      {/* EMPTY */}
      {appointments.length === 0 ? (

        <div className="
          bg-white
          rounded-3xl
          shadow-md
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
                relative
                bg-white
                rounded-3xl
                border
                border-gray-100
                shadow-md
                hover:shadow-xl
                transition-all
                duration-300
                p-6
              "
            >

              {/* REMOVE CARD */}
              <button

                onClick={() =>

                  handleRemoveCard(
                    appointment._id
                  )

                }

                className="
                  absolute
                  top-3
                  right-3
                  text-gray-400
                  hover:text-red-500
                  transition
                  text-sm
                  font-bold
                "
              >

                ✕

              </button>

              {/* TOP */}
              <div className="
                flex
                items-center
                gap-4
                mb-8
              ">

                {/* AVATAR */}
                <div className={`
                  w-16
                  h-16
                  rounded-full
                  flex
                  items-center
                  justify-center
                  text-2xl
                  font-bold
                  shrink-0

                  ${
                    appointment.status ===
                    "approved"

                    ?

                    "bg-green-100 text-green-700"

                    :

                    appointment.status ===
                    "cancelled"

                    ?

                    "bg-red-100 text-red-700"

                    :

                    "bg-blue-100 text-blue-700"
                  }
                `}>

                  {
                    appointment?.patient?.name
                      ?.charAt(0)
                      ?.toUpperCase()
                  }

                </div>

                {/* INFO */}
                <div className="
                  overflow-hidden
                  flex-1
                ">

                  <h2 className="
                    text-xl
                    font-bold
                    text-gray-800
                    truncate
                  ">

                    {
                      appointment?.patient
                      ?.name
                    }

                  </h2>

                  <p className="
                    text-gray-500
                    text-sm
                    truncate
                  ">

                    {
                      appointment?.patient
                      ?.email
                    }

                  </p>

                </div>

              </div>

              {/* LINE */}
              <div className="
                border-t
                border-gray-100
                mb-6
              " />

              {/* DETAILS */}
              <div className="
                grid
                grid-cols-3
                gap-4
                mb-8
                text-center
              ">

                {/* DATE */}
                <div>

                  <p className="
                    text-gray-400
                    text-sm
                    mb-2
                  ">

                    Date

                  </p>

                  <h3 className="
                    font-semibold
                    text-gray-800
                    text-sm
                  ">

                    {
                      appointment
                      .appointmentDate
                    }

                  </h3>

                </div>

                {/* TIME */}
                <div>

                  <p className="
                    text-gray-400
                    text-sm
                    mb-2
                  ">

                    Time

                  </p>

                  <h3 className="
                    font-semibold
                    text-gray-800
                    text-sm
                  ">

                    {
                      appointment
                      .appointmentTime
                    }

                  </h3>

                </div>

                {/* STATUS */}
                <div>

                  <p className="
                    text-gray-400
                    text-sm
                    mb-2
                  ">

                    Status

                  </p>

                  <span className={`
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-semibold

                    ${
                      appointment.status ===
                      "approved"

                      ?

                      "bg-green-100 text-green-700"

                      :

                      appointment.status ===
                      "cancelled"

                      ?

                      "bg-red-100 text-red-700"

                      :

                      "bg-yellow-100 text-yellow-700"
                    }
                  `}>

                    {
                      appointment.status
                    }

                  </span>

                </div>

              </div>

              {/* BUTTONS */}
              <div className="
                flex
                gap-3
                mt-4
              ">

                {/* APPROVE */}
                <button

                  onClick={() =>

                    handleApprove(
                      appointment._id
                    )

                  }

                  className={`
                    flex-1
                    py-3
                    rounded-2xl
                    font-semibold
                    transition-all
                    duration-300

                    ${
                      appointment.status ===
                      "approved"

                      ?

                      "bg-green-500 text-white"

                      :

                      "bg-green-100 hover:bg-green-500 hover:text-white text-green-700"
                    }
                  `}
                >

                  {
                    appointment.status ===
                    "approved"

                    ?

                    "Approved"

                    :

                    "Approve"
                  }

                </button>

                {/* REJECT */}
                <button

                  onClick={() =>

                    handleReject(
                      appointment._id
                    )

                  }

                  className={`
                    flex-1
                    py-3
                    rounded-2xl
                    font-semibold
                    transition-all
                    duration-300

                    ${
                      appointment.status ===
                      "cancelled"

                      ?

                      "bg-red-500 text-white"

                      :

                      "bg-red-100 hover:bg-red-500 hover:text-white text-red-700"
                    }
                  `}
                >

                  {
                    appointment.status ===
                    "cancelled"

                    ?

                    "Rejected"

                    :

                    "Reject"
                  }

                </button>

              </div>

              {/* DETAILS BUTTON */}
              <button

                onClick={() =>

                  navigate(

                    `/prescription/${appointment._id}`

                  )

                }

                className="
                  w-full
                  mt-4
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  py-3
                  rounded-2xl
                  font-semibold
                  transition-all
                  duration-300
                "
              >

                View Details

              </button>

            </div>

          ))}

        </div>

      )}

    </div>

  );
};

export default AppointmentCards;