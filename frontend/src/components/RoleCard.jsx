import { useNavigate } from "react-router-dom";

const RoleCard = ({
  title,
  description,
  icon,
  locked = false,
}) => {

  const navigate = useNavigate();

  const handleClick = () => {

    // ADMIN
    if (locked) {
      navigate("/admin-login");
      return;
    }

    // OTHER USERS
    navigate("/register");
  };

  return (

    <div

      onClick={handleClick}

      className={`
        bg-white
        rounded-2xl
        shadow-lg
        p-8
        h-80
        flex
        flex-col
        justify-center
        items-center
        transition-all
        duration-300
        hover:scale-105
        hover:shadow-2xl
        cursor-pointer
        w-full
        ${locked ? "opacity-90" : ""}
      `}
    >

      {/* ICON */}
      <div
        className="
          text-6xl
          mb-6
          flex
          justify-center
        "
      >
        {icon}
      </div>

      {/* TITLE */}
      <h2
        className="
          text-3xl
          font-bold
          text-center
          text-blue-700
        "
      >
        {title}
      </h2>

      {/* DESCRIPTION */}
      <p
        className="
          text-gray-600
          mt-4
          text-center
          text-lg
          leading-8
        "
      >
        {description}
      </p>

      {/* ADMIN TEXT */}
      {locked && (

        <p
          className="
            text-red-500
            text-center
            mt-6
            font-semibold
            text-lg
          "
        >
          Admin Access Only
        </p>

      )}

    </div>
  );
};

export default RoleCard;