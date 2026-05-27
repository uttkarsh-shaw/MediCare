import RoleCard from "../components/RoleCard";
import {useNavigate} from "react-router-dom";

import {
  FaUserInjured,
  FaUserMd,
  FaClinicMedical,
  FaLock,
} from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Hero Section */}
      <div className="text-center pt-12 px-4">

        <h1 className="text-5xl font-bold text-blue-700">
          MediLink
        </h1>

        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Connecting Rural Patients with Doctors,
          Pharmacies, and Better Healthcare Services.
        </p>
      </div>

      {/* Cards Section */}
      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-8
        px-6
        py-14
      ">

        <RoleCard
          title="Patient"
          description="Book appointments and consult doctors online."
          icon={<FaUserInjured className="text-blue-600" />}
        />

        <RoleCard
          title="Doctor"
          description="Manage appointments and provide prescriptions."
          icon={<FaUserMd className="text-green-600" />}
        />

        <RoleCard
          title="Pharmacy"
          description="Manage medicines and prescription requests."
          icon={<FaClinicMedical className="text-purple-600" />}
        />

        <RoleCard
          title="Admin"
          description="Platform management and approvals."
          icon={<FaLock className="text-red-500" />}
          locked={true}
        />

      </div>

      {/* Mission Section */}
      <div className="bg-white py-14 px-6">

        <h2 className="text-4xl font-bold text-center text-blue-700">
          Our Mission
        </h2>

        <p className="
          max-w-4xl
          mx-auto
          text-center
          text-gray-600
          mt-6
          text-lg
          leading-8
        ">
          MediLink aims to improve healthcare accessibility
          in rural areas by connecting patients with verified
          doctors and pharmacies through an easy-to-use
          telemedicine platform.
        </p>

      </div>

      {/* Footer */}
      <footer className="
        bg-blue-700
        text-white
        text-center
        py-5
      ">
        © 2026 MediLink. All Rights Reserved.
      </footer>

    </div>
  );
};

export default Home;