import { useNavigate }
from "react-router-dom";

const RoleCard = ({
  title,
  description,
  icon,
  locked = false,
}) => {

  const navigate = useNavigate();

  return (

    <div

      onClick={() => {

        if (locked) {

          navigate("/admin-login");

        }

      }}

      className={`
        bg-white rounded-2xl shadow-lg p-6
        transition-all duration-300
        hover:scale-105 hover:shadow-2xl
        cursor-pointer
        ${locked ? "opacity-70" : ""}
      `}
    >

      <div className="
        text-5xl
        mb-4
        flex
        justify-center
      ">
        {icon}
      </div>


      <h2 className="
        text-2xl
        font-bold
        text-center
        text-blue-700
      ">
        {title}
      </h2>


      <p className="
        text-gray-600
        mt-3
        text-center
      ">
        {description}
      </p>


      {locked && (

        <p className="
          text-red-500
          text-center
          mt-4
          font-semibold
        ">
          Admin Access Only
        </p>

      )}

    </div>
  );
};

export default RoleCard;