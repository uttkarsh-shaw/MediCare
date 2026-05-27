import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/Navbar";
import Doctors from "./pages/Doctors";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import CreateDoctorProfile from "./pages/CreateDoctorProfile";
import BookAppointment from "./pages/BookAppointment";
import MyAppointments from "./pages/MyAppointments";
import AdminRoute from "./routes/AdminRoute";
import PrescriptionPage from "./pages/PrescriptionPage";
import AppointmentDetailsPage from "./pages/AppointmentDetailsPage";
import VideoCall from "./pages/VideoCall";
import HealthInfoPage from "./pages/HealthInfoPage";
import { Toaster }  from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>

    <Toaster  //toast notification container
      position="top-right"
      reverseOrder={false}
    />

      <Navbar />
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
        path="/admin-dashboard"
        element={
          <AdminRoute>

            <AdminDashboard />

          </AdminRoute>
        }
      />

       <Route  path="/admin-login" element={<AdminLogin />}/>
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/create-doctor-profile" element={<CreateDoctorProfile />} />
          <Route
          path="/book-appointment/:doctorId"
          element={<BookAppointment />}
        />

        <Route
         path="/my-appointments"
        element={
        <ProtectedRoute>
          <MyAppointments />
        </ProtectedRoute>  }
        />


        <Route

          path="/prescription/:appointmentId"
          element={
            <ProtectedRoute>
              <PrescriptionPage />
            </ProtectedRoute>
          }
        />


        <Route
        path="/appointment-details/:appointmentId"
        element={
          <ProtectedRoute>
            <AppointmentDetailsPage />
          </ProtectedRoute>

        }
      />
        <Route
            path="/video-call/:roomId"
            element={<VideoCall />}
        />
        <Route
          path="/health-info"
          element={<HealthInfoPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;