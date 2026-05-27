import {
  useEffect,
  useRef
} from "react";

import {
  useParams
} from "react-router-dom";

import {
  ZegoUIKitPrebuilt
} from "@zegocloud/zego-uikit-prebuilt";



const VideoCall = () => {

  const meetingRef = useRef(null);

  const zpRef = useRef(null);

  const hasJoined = useRef(false);

  const { roomId } = useParams();



  useEffect(() => {

    if (hasJoined.current) return;

    hasJoined.current = true;



    const myMeeting = async () => {

      const appID = 1679832998;

      const serverSecret =
        "8ce349cc04f605f269f4c6b828dfcab2";



      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );



      const kitToken =
        ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          roomId,
          Date.now().toString(),
          userInfo?.name || "User"
        );



      const zp =
        ZegoUIKitPrebuilt.create(
          kitToken
        );



      zpRef.current = zp;



      zp.joinRoom({

        container: meetingRef.current,

        sharedLinks: [
          {
            name: "Copy Link",
            url: window.location.href,
          },
        ],

        scenario: {
          mode:
            ZegoUIKitPrebuilt
              .OneONoneCall,
        },
      });
    };



    myMeeting();




    // CLEANUP FUNCTION
    return () => {

      if (zpRef.current) {

        zpRef.current.destroy();

      }

      hasJoined.current = false;
    };

  }, [roomId]);



  return (

    <div
      ref={meetingRef}
      className="
        w-full
        h-screen
      "
    />

  );
};



export default VideoCall;