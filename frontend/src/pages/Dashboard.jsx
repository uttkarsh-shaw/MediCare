import { useAuth } from "../context/AuthContext";

import PatientDashboard from "./PatientDashboard";

import DoctorDashboard from "./DoctorDashboard";

import PharmacyDashboard from "./PharmacyDashboard";


const Dashboard = () => {

  const { userInfo } = useAuth();


  // WAIT UNTIL USER LOADS
  if (!userInfo) {

    return (

      <div className="
        min-h-screen
        flex
        items-center
        justify-center
        text-2xl
        font-bold
      ">

        Loading...

      </div>

    );
  }


  // PATIENT
  if (userInfo.role === "patient") {

    return <PatientDashboard />;

  }


  // DOCTOR
  if (userInfo.role === "doctor") {

    return <DoctorDashboard />;

  }


  // PHARMACY
  if (userInfo.role === "pharmacy") {

    return <PharmacyDashboard />;

  }


  return (

    <div>

      No Dashboard Found

    </div>

  );
};

export default Dashboard;