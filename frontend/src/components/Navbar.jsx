import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";



const Navbar = () => {

  const navigate = useNavigate();

  const { userInfo, logout } =
    useAuth();




  // LOGOUT
  const handleLogout = () => {

    logout();

    // REDIRECT HOME
    navigate("/");

  };




  return (

    <nav className="
      bg-blue-700
      text-white
      px-6
      py-4
      flex
      justify-between
      items-center
      shadow-lg
    ">




      {/* LOGO */}
      <Link
        to="/"
        className="
          text-3xl
          font-bold
          tracking-wide
        "
      >

        MediLink

      </Link>





      {/* NAV LINKS */}
      <div className="
        flex
        gap-6
        items-center
      ">




        {/* HOME */}
        <Link
          to="/"
          className="
            hover:text-blue-200
            transition
            font-medium
          "
        >

          Home

        </Link>





        {/* HEALTH INFO */}
        <Link
          to="/health-info"
          className="
            hover:text-blue-200
            transition
            font-medium
          "
        >

          Health Info

        </Link>





        {/* NOT LOGGED IN */}
        {!userInfo ? (

          <>

            <Link
              to="/login"
              className="
                hover:text-blue-200
                transition
                font-medium
              "
            >

              Login

            </Link>




            <Link
              to="/register"
              className="
                hover:text-blue-200
                transition
                font-medium
              "
            >

              Register

            </Link>

          </>

        ) : (

          <>




            {/* DOCTORS */}
            <Link
              to="/doctors"
              className="
                hover:text-blue-200
                transition
                font-medium
              "
            >

              Doctors

            </Link>





            {/* DYNAMIC DASHBOARD */}
            {

              userInfo?.role === "admin"

                ? (

                  <Link
                    to="/admin-dashboard"
                    className="
                      hover:text-blue-200
                      transition
                      font-medium
                    "
                  >

                    Dashboard

                  </Link>

                )

                : (

                  <Link
                    to="/dashboard"
                    className="
                      hover:text-blue-200
                      transition
                      font-medium
                    "
                  >

                    Dashboard

                  </Link>

                )

            }






            {/* USER NAME */}
            <div className="
              bg-blue-600
              px-4
              py-2
              rounded-full
              font-semibold
              text-sm
            ">

              {userInfo.name}

            </div>





            {/* LOGOUT */}
            <button

              onClick={handleLogout}

              className="
                bg-red-500
                hover:bg-red-600
                px-4
                py-2
                rounded-lg
                transition
                font-medium
              "
            >

              Logout

            </button>

          </>

        )}

      </div>

    </nav>

  );
};



export default Navbar;