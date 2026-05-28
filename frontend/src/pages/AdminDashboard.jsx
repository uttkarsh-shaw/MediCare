import { useEffect, useState } from "react";

const AdminDashboard = () => {

  const [doctors, setDoctors] = useState([]);

  const [activeTab, setActiveTab] =
    useState("pending");


  // FETCH ALL DOCTORS
  const fetchDoctors = async () => {

    try {

      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      const response = await fetch(

        "https://medicare-wiyz.onrender.com/api/doctors/all",

        {
          headers: {
            Authorization:
              `Bearer ${userInfo.token}`,
          },
        }

      );

      const data = await response.json();

      setDoctors(data);

    } catch (error) {

      console.log(error);

    }
  };


  // APPROVE DOCTOR
  const approveDoctor = async (id) => {

    try {

      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      await fetch(

        `https://medicare-wiyz.onrender.com/api/doctors/approve/${id}`,

        {
          method: "PUT",

          headers: {
            Authorization:
              `Bearer ${userInfo.token}`,
          },
        }

      );

      fetchDoctors();

    } catch (error) {

      console.log(error);

    }
  };


  // REJECT DOCTOR
  const rejectDoctor = async (id) => {

    try {

      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      await fetch(

        `https://medicare-wiyz.onrender.com/api/doctors/reject/${id}`,

        {
          method: "PUT",

          headers: {
            Authorization:
              `Bearer ${userInfo.token}`,
          },
        }

      );

      fetchDoctors();

    } catch (error) {

      console.log(error);

    }
  };


  useEffect(() => {

    fetchDoctors();

  }, []);


  // FILTER DOCTORS
  const filteredDoctors =
    doctors.filter(

      (doctor) =>

        doctor.approvalStatus ===
        activeTab

    );

  return (
    
    <div className="
      min-h-screen
      bg-gray-100
      p-8
    ">

      {/* HEADING */}
      <div className="mb-10">

        <h1 className="
          text-4xl
          font-bold
          text-blue-700
        ">
          Admin Dashboard 🛡️
        </h1>

        <p className="
          text-gray-600
          mt-2
        ">
          Manage Doctor Approval Requests
        </p>

      </div>


      {/* TABS */}
      <div className="
        flex
        gap-4
        mb-10
        flex-wrap
      ">

        {/* PENDING */}
        <button

          onClick={() =>
            setActiveTab("pending")
          }

          className={`

            px-5
            py-2

            rounded-full

            font-semibold

            transition-all
            duration-300

            ${activeTab === "pending"

              ? "bg-yellow-500 text-white"

              : "bg-white text-gray-700"}
          `}
        >

          Pending

        </button>


        {/* APPROVED */}
        <button

          onClick={() =>
            setActiveTab("approved")
          }

          className={`

            px-5
            py-2

            rounded-full

            font-semibold

            transition-all
            duration-300

            ${activeTab === "approved"

              ? "bg-green-600 text-white"

              : "bg-white text-gray-700"}
          `}
        >

          Approved

        </button>


        {/* REJECTED */}
        <button

          onClick={() =>
            setActiveTab("rejected")
          }

          className={`

            px-5
            py-2

            rounded-full

            font-semibold

            transition-all
            duration-300

            ${activeTab === "rejected"

              ? "bg-red-600 text-white"

              : "bg-white text-gray-700"}
          `}
        >

          Rejected

        </button>

      </div>


      {/* EMPTY STATE */}
      {filteredDoctors.length === 0 ? (

        <div className="
          bg-white
          p-10
          rounded-3xl
          shadow-lg
          text-center
        ">

          <h2 className="
            text-2xl
            font-bold
            text-gray-700
          ">

            No {activeTab} Doctors 🚀

          </h2>

        </div>

      ) : (

        <div className="
          grid
          md:grid-cols-2
          xl:grid-cols-3
          gap-8
        ">

          {filteredDoctors.map((doctor,index) => (

            <div

              key={doctor._id}

              className="
                bg-white
                rounded-3xl
                overflow-hidden
                border
                border-gray-100

                hover:shadow-2xl
                hover:border-blue-200

                transition-all
                duration-300
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

                {/* STATUS */}
                <div className="mb-5">

                  <span className={`

                    px-4
                    py-1
                    rounded-full

                    text-sm
                    font-semibold
                    text-white

                    ${doctor.approvalStatus ===
                      "approved"

                      ? "bg-green-500"

                      : doctor.approvalStatus ===
                      "rejected"

                      ? "bg-red-500"

                      : "bg-yellow-500"
                    }

                  `}>

                    {doctor.approvalStatus}

                  </span>

                </div>


                {/* NAME */}
                <h2 className="
                  text-2xl
                  font-bold
                  text-blue-700
                  mb-2
                ">

                  {doctor.user.name}

                </h2>


                {/* EMAIL */}
                <p className="
                  text-gray-500
                  mb-5
                ">

                  {doctor.user.email}

                </p>


                {/* DETAILS */}
                <div className="
                  space-y-3
                  text-gray-700
                ">

                  <p>

                    <strong>
                      Specialization:
                    </strong>

                    {" "}
                    {doctor.specialization}

                  </p>


                  <p>

                    <strong>
                      Experience:
                    </strong>

                    {" "}
                    {doctor.experience} years

                  </p>


                  <p>

                    <strong>
                      Fee:
                    </strong>

                    {" "}
                    ₹{doctor.consultationFee}

                  </p>


                  <p>

                    <strong>
                      Timings:
                    </strong>

                    {" "}
                    {doctor.timings}

                  </p>

                </div>


                {/* CERTIFICATE */}
                <div className="
                  mt-6
                  bg-gray-50
                  border
                  border-gray-100
                  p-4
                  rounded-2xl
                ">

                  <p className="
                    text-sm
                    text-gray-500
                    mb-1
                  ">
                    Certificate
                  </p>

                  <p className="
                    font-medium
                    text-gray-800
                  ">
                    {doctor.certificate}
                  </p>

                </div>


                {/* ACTIONS */}
                <div className="
                  flex
                  gap-3
                  mt-6
                ">

                  {/* APPROVE */}
                  <button

                    onClick={() =>
                      approveDoctor(
                        doctor._id
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
                      rejectDoctor(
                        doctor._id
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

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default AdminDashboard;