import {
  useNavigate
} from "react-router-dom";



const VideoCallButton = ({ appointment }) => {

  const navigate = useNavigate();



  const appointmentDateTime =
    new Date(
      `${appointment.appointmentDate} ${appointment.appointmentTime}`
    );



  const currentTime =
    new Date();



  const canJoin =
    currentTime >= appointmentDateTime;



  const handleVideoCall = () => {

    if (!canJoin) {
      alert(
        "Video call will be available at appointment time."
      );

      return;
    }



    navigate(
      `/video-call/${appointment._id}`
    );
  };



  return (

    <button
      onClick={handleVideoCall}

      className={`
        text-white
        px-4
        py-2
        rounded-lg
        font-semibold

        ${
          canJoin

            ? "bg-blue-600 hover:bg-blue-700"

            : "bg-gray-400 cursor-not-allowed"
        }
      `}
    >

      {
        canJoin
          ? "Start Video Call"
          : "Call Locked"
      }

    </button>

  );
};



export default VideoCallButton;