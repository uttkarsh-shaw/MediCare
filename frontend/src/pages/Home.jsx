import RoleCard from "../components/RoleCard";

import {
  FaUserInjured,
  FaUserMd,
  FaClinicMedical,
  FaLock,
} from "react-icons/fa";

const Home = () => {

  return (

    <div className="min-h-screen bg-gray-100 w-full overflow-x-hidden">

      {/* HERO SECTION */}
      <div className="text-center pt-12 px-4">

        <h1
          className="
            text-4xl
            sm:text-5xl
            font-bold
            text-blue-700
          "
        >
          MediLink
        </h1>

        <p
          className="
            mt-4
            text-base
            sm:text-lg
            text-gray-600
            max-w-2xl
            mx-auto
            leading-7
          "
        >
          Connecting Rural Patients with Doctors,
          Pharmacies, and Better Healthcare Services.
        </p>

      </div>

      {/* CARDS SECTION */}
      <div
        className="
          max-w-7xl
          mx-auto
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-8
          px-4
          sm:px-6
          py-14
        "
      >

        {/* PATIENT */}
        <RoleCard
          title="Patient"
          description="Book appointments and consult doctors online."
          icon={<FaUserInjured className="text-blue-600" />}
        />

        {/* DOCTOR */}
        <RoleCard
          title="Doctor"
          description="Manage appointments and provide prescriptions."
          icon={<FaUserMd className="text-green-600" />}
        />

        {/* PHARMACY */}
        <RoleCard
          title="Pharmacy"
          description="Manage medicines and prescription requests."
          icon={<FaClinicMedical className="text-purple-600" />}
        />

        {/* ADMIN */}
        <RoleCard
          title="Admin"
          description="Platform management and approvals."
          icon={<FaLock className="text-red-500" />}
          locked={true}
        />

      </div>

      {/* MISSION SECTION */}
      <div className="bg-white py-14 px-6">

        <h2
          className="
            text-3xl
            sm:text-4xl
            font-bold
            text-center
            text-blue-700
          "
        >
          Our Mission
        </h2>

        <p
          className="
            max-w-4xl
            mx-auto
            text-center
            text-gray-600
            mt-6
            text-base
            sm:text-lg
            leading-8
          "
        >
          MediLink aims to improve healthcare accessibility
          in rural areas by connecting patients with verified
          doctors and pharmacies through an easy-to-use
          telemedicine platform.
        </p>

      </div>

      {/* FOOTER */}
      <footer
        className="
          bg-blue-700
          text-white
          text-center
          py-5
          text-sm
          sm:text-base
        "
      >
        © 2026 MediLink. All Rights Reserved.
      </footer>

    </div>

  );
};

export default Home;