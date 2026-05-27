import {

  useNavigate

} from "react-router-dom";

const PatientAppointmentCard = ({

  appointment,

}) => {

  const navigate =
    useNavigate();

  return (

    <div

      onClick={() =>

        navigate(

          `/appointment-details/${appointment._id}`

        )

      }

      className="
        bg-white
        rounded-2xl
        shadow-lg
        p-6
        cursor-pointer
        hover:shadow-2xl
        hover:scale-[1.02]
        transition
        duration-300
      "
    >

      {/* PRESCRIPTION BADGE */}
      {

        appointment?.medicines
        ?.length > 0 && (

          <div className="
            flex
            justify-end
            mb-3
          ">

            <span className="
              bg-green-100
              text-green-700
              px-3
              py-1
              rounded-full
              text-sm
              font-semibold
            ">

              Prescription Uploaded ✅

            </span>

          </div>

        )

      }


      {/* DOCTOR NAME */}
      <h2 className="
        text-2xl
        font-bold
        text-blue-700
        mb-4
      ">

        Dr. {

          appointment
          ?.doctor
          ?.user
          ?.name

        }

      </h2>


      {/* EMAIL */}
      <p className="mb-2">

        <span className="
          font-semibold
        ">

          Email:

        </span>

        {" "}

        {

          appointment
          ?.doctor
          ?.user
          ?.email

        }

      </p>


      {/* DATE */}
      <p className="mb-2">

        <span className="
          font-semibold
        ">

          Date:

        </span>

        {" "}

        {
          appointment
          .appointmentDate
        }

      </p>


      {/* TIME */}
      <p className="mb-4">

        <span className="
          font-semibold
        ">

          Time:

        </span>

        {" "}

        {
          appointment
          .appointmentTime
        }

      </p>


      {/* STATUS */}
      <span className={`
        px-4
        py-2
        rounded-full
        text-white
        font-semibold

        ${
          appointment.status ===
          "approved"

          ?

          "bg-green-500"

          :

          appointment.status ===
          "rejected"

          ?

          "bg-red-500"

          :

          appointment.status ===
          "completed"

          ?

          "bg-blue-600"

          :

          "bg-yellow-500"
        }
      `}>

        {
          appointment.status
        }

      </span>

    </div>

  );
};

export default
PatientAppointmentCard;