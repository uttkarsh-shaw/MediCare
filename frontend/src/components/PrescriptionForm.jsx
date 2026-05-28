import { useEffect, useState }
from "react";

import toast
from "react-hot-toast";

const PrescriptionForm = ({

  appointmentId,

  appointment,

  fetchAppointments,

}) => {

  const [showForm, setShowForm] =
    useState(false);

  const [medicines, setMedicines] =
    useState("");

  const [advice, setAdvice] =
    useState("");

  const [tests, setTests] =
    useState("");


  // LOAD EXISTING DATA
  useEffect(() => {

    if (appointment) {

      setMedicines(

        appointment?.medicines
          ?.join(", ")

          || ""

      );

      setAdvice(
        appointment?.advice || ""
      );

      setTests(
        appointment?.tests || ""
      );

    }

  }, [appointment]);


  // SAVE PRESCRIPTION
  const savePrescription =
    async () => {

      try {

        const userInfo = JSON.parse(

          localStorage.getItem(
            "userInfo"
          )

        );


        // STRING → ARRAY
        const medicinesArray =

          medicines

            .split(",")

            .map((item) =>
              item.trim()
            )

            .filter(
              (item) => item !== ""
            );


        const response = await fetch(

          `https://medicare-wiyz.onrender.com/api/appointments/prescription/${appointmentId}`,

          {

            method: "PUT",

            headers: {

              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${userInfo.token}`,

            },

            body: JSON.stringify({

              medicines:
                medicinesArray,

              advice,

              tests,

            }),

          }

        );


        const data =
          await response.json();

        console.log(data);


        // SUCCESS TOASTER
        toast.success(
          "Prescription Saved Successfully ✅"
        );


        // REFRESH DATA
        await fetchAppointments();


        // CLOSE FORM
        setShowForm(false);

      } catch (error) {

        console.log(error);

        // ERROR TOASTER
        toast.error(
          "Failed To Save Prescription ❌"
        );

      }
    };


  return (

    <div>

      {/* TOGGLE BUTTON */}
      <button

        onClick={() =>
          setShowForm(
            !showForm
          )
        }

        className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-5
          py-3
          rounded-xl
          font-semibold
          transition
          mb-6
        "
      >

        {showForm

          ? "Close Prescription"

          : "Add / Edit Prescription"}

      </button>


      {/* SAVED PRESCRIPTION */}
      {(appointment?.medicines?.length > 0 ||

        appointment?.advice ||

        appointment?.tests) && (

        <div className="
          bg-white
          border
          rounded-2xl
          p-6
          mb-8
          shadow-sm
        ">

          <h2 className="
            text-2xl
            font-bold
            text-green-700
            mb-5
          ">

            Saved Prescription 📋

          </h2>


          {/* MEDICINES */}
          {appointment?.medicines?.length > 0 && (

            <div className="mb-5">

              <h3 className="
                text-lg
                font-bold
                text-gray-800
                mb-2
              ">

                Medicines

              </h3>

              <ul className="
                list-disc
                pl-6
                text-gray-700
                space-y-1
              ">

                {appointment?.medicines?.map(
                  (medicine, index) => (

                  <li key={index}>
                    {medicine}
                  </li>

                ))}

              </ul>

            </div>

          )}


          {/* ADVICE */}
          {appointment?.advice && (

            <div className="mb-5">

              <h3 className="
                text-lg
                font-bold
                text-gray-800
                mb-2
              ">

                Advice

              </h3>

              <p className="
                text-gray-700
                leading-relaxed
              ">

                {appointment?.advice}

              </p>

            </div>

          )}


          {/* TESTS */}
          {appointment?.tests && (

            <div>

              <h3 className="
                text-lg
                font-bold
                text-gray-800
                mb-2
              ">

                Tests

              </h3>

              <p className="
                text-gray-700
                leading-relaxed
              ">

                {appointment?.tests}

              </p>

            </div>

          )}

        </div>

      )}


      {/* FORM */}
      {showForm && (

        <div className="
          bg-gray-50
          border
          rounded-2xl
          p-8
          space-y-6
        ">

          {/* MEDICINES */}
          <div>

            <label className="
              block
              text-lg
              font-semibold
              text-gray-700
              mb-2
            ">

              Medicines

            </label>

            <input

              type="text"

              placeholder="
Paracetamol, Vitamin C
              "

              value={medicines}

              onChange={(e) =>
                setMedicines(
                  e.target.value
                )
              }

              className="
                w-full
                border
                p-4
                rounded-xl
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

          </div>


          {/* ADVICE */}
          <div>

            <label className="
              block
              text-lg
              font-semibold
              text-gray-700
              mb-2
            ">

              Advice

            </label>

            <textarea

              rows="5"

              placeholder="
Drink more water
              "

              value={advice}

              onChange={(e) =>
                setAdvice(
                  e.target.value
                )
              }

              className="
                w-full
                border
                p-4
                rounded-xl
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

          </div>


          {/* TESTS */}
          <div>

            <label className="
              block
              text-lg
              font-semibold
              text-gray-700
              mb-2
            ">

              Tests

            </label>

            <textarea

              rows="3"

              placeholder="
Blood Test
              "

              value={tests}

              onChange={(e) =>
                setTests(
                  e.target.value
                )
              }

              className="
                w-full
                border
                p-4
                rounded-xl
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

          </div>


          {/* SAVE BUTTON */}
          <button

            onClick={savePrescription}

            className="
              bg-green-600
              hover:bg-green-700
              text-white
              px-8
              py-4
              rounded-xl
              font-semibold
              text-lg
              transition
            "
          >

            Save Prescription

          </button>

        </div>

      )}

    </div>

  );
};

export default PrescriptionForm;