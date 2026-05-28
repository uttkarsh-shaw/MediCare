import PaymentButton from "../components/PaymentButton";

import VideoCallButton from "../components/VideoCallButton";

import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import downloadPrescriptionPDF
from "../utils/downloadPrescriptionPDF";



const AppointmentDetailsPage = () => {

  const {
    appointmentId
  } = useParams();



  const [
    appointment,
    setAppointment
  ] = useState(null);



  const [
    loading,
    setLoading
  ] = useState(true);




  // FETCH APPOINTMENT DETAILS
  const fetchAppointment = async () => {

    try {

      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );



      const response = await fetch(
        `https://medicare-wiyz.onrender.com/api/appointments/${appointmentId}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );



      const data = await response.json();

      console.log(data);

      setAppointment(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };



  useEffect(() => {

    fetchAppointment();

  }, []);




  // LOADING
  if (loading) {

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




  // NO DATA
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

        Appointment Not Found

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
        <h1 className="
          text-4xl
          font-bold
          text-blue-700
          mb-8
        ">

          Appointment Details 📋

        </h1>




        {/* DOCTOR INFO */}
        <div className="
          grid
          md:grid-cols-2
          gap-6
          mb-10
        ">

          <div>

            <p className="
              text-gray-500
              mb-1
            ">
              Doctor Name
            </p>

            <h2 className="
              text-2xl
              font-bold
            ">

              Dr. {
                appointment
                  ?.doctor
                  ?.user
                  ?.name
              }

            </h2>

          </div>



          <div>

            <p className="
              text-gray-500
              mb-1
            ">
              Email
            </p>

            <h2 className="
              text-xl
              font-semibold
            ">

              {
                appointment
                  ?.doctor
                  ?.user
                  ?.email
              }

            </h2>

          </div>



          <div>

            <p className="
              text-gray-500
              mb-1
            ">
              Appointment Date
            </p>

            <h2 className="
              text-xl
              font-semibold
            ">

              {
                appointment
                  ?.appointmentDate
              }

            </h2>

          </div>



          <div>

            <p className="
              text-gray-500
              mb-1
            ">
              Appointment Time
            </p>

            <h2 className="
              text-xl
              font-semibold
            ">

              {
                appointment
                  ?.appointmentTime
              }

            </h2>

          </div>

        </div>




        {/* STATUS + PAYMENT */}
        <div className="
          flex
          flex-wrap
          items-center
          justify-between
          gap-4
          mb-10
        ">

          {/* LEFT SIDE */}
          <div className="
            flex
            flex-wrap
            items-center
            gap-4
          ">

            {/* APPOINTMENT STATUS */}
            <span
              className={`
                px-6
                py-3
                rounded-full
                text-white
                font-semibold
                text-lg

                ${
                  appointment.status === "approved"

                    ? "bg-green-500"

                    : appointment.status === "completed"

                    ? "bg-blue-600"

                    : appointment.status === "cancelled"

                    ? "bg-red-500"

                    : "bg-yellow-500"
                }
              `}
            >

              {appointment.status}

            </span>




            {/* PAYMENT STATUS */}
            <div className="
              flex
              items-center
              gap-2
              text-lg
              font-semibold
            ">

              <span className="text-gray-700">
                Payment:
              </span>

              <span className="text-blue-600">

                {
                  appointment.status === "completed"
                    ? "paid"
                    : appointment.paymentStatus
                }

              </span>

            </div>




            {/* PAYMENT SUCCESS */}
            {(appointment.paymentStatus === "paid" ||
              appointment.status === "completed") && (

              <div className="
                text-green-600
                font-bold
                text-lg
              ">

                Payment Completed ✅

              </div>

            )}

          </div>




          {/* RIGHT SIDE BUTTONS */}
          <div>

            {appointment.status === "approved" &&
             appointment.paymentStatus !== "paid" && (

              <PaymentButton
                appointment={appointment}
              />

            )}



            {(appointment.paymentStatus === "paid" ||
              appointment.status === "completed") && (

              <VideoCallButton
                appointment={appointment}
              />

            )}

          </div>

        </div>




        {/* PRESCRIPTION */}
        <div className="
          border-t
          pt-8
        ">

          <h2 className="
            text-3xl
            font-bold
            text-blue-700
            mb-6
          ">

            Prescription 💊

          </h2>




          {/* NO PRESCRIPTION */}
          {
            appointment.medicines?.length === 0 &&
            !appointment.advice &&
            !appointment.tests

              ? (

                <p className="
                  text-xl
                  font-semibold
                  text-gray-500
                ">

                  Prescription Not Added Yet

                </p>

              ) : (

                <div className="
                  space-y-8
                ">


                  {/* MEDICINES */}
                  <div>

                    <h3 className="
                      text-2xl
                      font-bold
                      mb-4
                    ">

                      Medicines

                    </h3>

                    <ul className="
                      list-disc
                      pl-6
                      space-y-2
                    ">

                      {
                        appointment
                          ?.medicines
                          ?.map(
                            (
                              medicine,
                              index
                            ) => (

                              <li
                                key={index}
                                className="
                                  text-lg
                                "
                              >

                                {medicine}

                              </li>

                            )
                          )
                      }

                    </ul>

                  </div>




                  {/* ADVICE */}
                  <div>

                    <h3 className="
                      text-2xl
                      font-bold
                      mb-4
                    ">

                      Advice

                    </h3>

                    <p className="
                      text-lg
                      text-gray-700
                    ">

                      {
                        appointment
                          ?.advice
                      }

                    </p>

                  </div>




                  {/* TESTS */}
                  <div>

                    <h3 className="
                      text-2xl
                      font-bold
                      mb-4
                    ">

                      Tests

                    </h3>

                    <p className="
                      text-lg
                      text-gray-700
                    ">

                      {
                        appointment
                          ?.tests
                      }

                    </p>

                  </div>




                  {/* DOWNLOAD PDF */}
                  <button

                    onClick={() =>
                      downloadPrescriptionPDF(
                        appointment
                      )
                    }

                    className="
                      bg-blue-600
                      hover:bg-blue-700
                      text-white
                      px-6
                      py-3
                      rounded-xl
                      font-semibold
                      transition
                    "
                  >

                    Download PDF

                  </button>

                </div>

              )
          }

        </div>

      </div>

    </div>

  );
};



export default AppointmentDetailsPage;