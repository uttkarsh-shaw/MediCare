import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {

  const navigate = useNavigate();

  const { userInfo, logout } = useAuth();

  // LOGOUT
  const handleLogout = () => {

    logout();

    navigate("/");

  };

  return (

    <nav
      className="
        bg-blue-700
        text-white
        px-4
        md:px-6
        py-4
        flex
        justify-between
        items-center
        shadow-lg
        w-full
      "
    >

      {/* LOGO */}
      <Link
        to="/"
        className="
          text-[10px]
          sm:text-2xl
          md:text-3xl
          font-bold
          tracking-wide
          whitespace-nowrap
        "
      >

        MediLink

      </Link>

      {/* NAV LINKS */}
      <div
        className="
          flex
          items-center
          gap-3
          sm:gap-5
          text-xs
          sm:text-sm
          md:text-base
          ml-auto
        "
      >

        {/* HOME - LAPTOP ONLY */}
        <Link
          to="/"
          className="
            hidden
            md:block
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
            whitespace-nowrap
          "
        >

          Health Hub

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
                whitespace-nowrap
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
                whitespace-nowrap
              "
            >

              Register

            </Link>

          </>

        ) : (

          <>

            {/* DOCTORS - DESKTOP ONLY */}
            <Link
              to="/doctors"
              className="
                hidden
                md:block
                hover:text-blue-200
                transition
                font-medium
              "
            >

              Doctors

            </Link>

            {/* DASHBOARD */}
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

            {/* USERNAME - LARGE SCREEN ONLY */}
            <div
              className="
                hidden
                lg:block
                bg-blue-600
                px-4
                py-2
                rounded-full
                font-semibold
                text-sm
              "
            >

              {userInfo.name}

            </div>

            {/* LOGOUT */}
            <button

              onClick={handleLogout}

              className="
                bg-red-500
                hover:bg-red-600
                px-3
                md:px-4
                py-2
                rounded-lg
                transition
                font-medium
                text-xs
                sm:text-sm
                md:text-base
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