const PaymentButton = ({ appointment }) => {

  const handlePayment = async () => {
    try {

        const userInfo = JSON.parse(
            localStorage.getItem("userInfo")
            );

        const token = userInfo.token;


      const orderResponse = await fetch(
        "https://medicare-wiyz.onrender.com/api/payment/create-order",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            appointmentId: appointment._id,
            amount: appointment.doctor.consultationFee,
          }),
        }
      );



      const orderData = await orderResponse.json();



      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: orderData.amount,

        currency: orderData.currency,

        name: "MediCore",

        description: "Doctor Consultation Payment",

        order_id: orderData.id,



        handler: async function (response) {

          const verifyResponse = await fetch(
            "https://medicare-wiyz.onrender.com/api/payment/verify",
            {
              method: "POST",

              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },

              body: JSON.stringify({
                ...response,
                appointmentId: appointment._id,
              }),
            }
          );



          const verifyData =
            await verifyResponse.json();



          alert(verifyData.message);

          window.location.reload();
        },
      };



      const razorpay =
        new window.Razorpay(options);

      razorpay.open();

    } catch (error) {
      console.log(error);

      alert("Payment Failed");
    }
  };



  return (
    <button
      onClick={handlePayment}
      className="
        bg-green-600
        hover:bg-green-700
        text-white
        px-4
        py-2
        rounded-lg
        mt-4
      "
    >
      Pay Now
    </button>
  );
};



export default PaymentButton;