import { useState } from "react";

import {
  useNavigate
} from "react-router-dom";

const CreateDoctorProfile = () => {

  const navigate =
    useNavigate();


  const [formData,
  setFormData] = useState({

    specialization: "",

    experience: "",

    certificate: "",

    consultationFee: "",

    timings: "",

  });


  // IMAGE STATE
  const [image,
  setImage] =
  useState(null);


  const [message,
  setMessage] =
  useState("");


  // HANDLE INPUT CHANGE
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value,

    });

  };


  // HANDLE IMAGE
  const handleImageChange =
  (e) => {

    setImage(

      e.target.files[0]

    );

  };


  const handleSubmit =
  async (e) => {

    e.preventDefault();

    try {

      const userInfo =
      JSON.parse(

        localStorage.getItem(
          "userInfo"
        )

      );


      // FORMDATA
      const doctorData =
      new FormData();


      doctorData.append(

        "specialization",

        formData.specialization

      );


      doctorData.append(

        "experience",

        formData.experience

      );


      doctorData.append(

        "certificate",

        formData.certificate

      );


      doctorData.append(

        "consultationFee",

        formData.consultationFee

      );


      doctorData.append(

        "timings",

        formData.timings

      );


      // IMAGE
      if (image) {

        doctorData.append(
          "image",
          image
        );

      }


      const response =
      await fetch(

        "http://localhost:5000/api/doctors/create-profile",

        {

          method: "POST",

          headers: {

            Authorization:
            `Bearer ${userInfo.token}`,

          },

          body: doctorData,

        }

      );


      const data =
      await response.json();

      console.log(data);


      if (!response.ok) {

        setMessage(
          data.message
        );

        return;
      }


      setMessage(

        "Doctor Profile Created Successfully"

      );


      setTimeout(() => {

        navigate(
          "/dashboard"
        );

      }, 1500);


    } catch (error) {

      console.log(error);

      setMessage(
        "Something Went Wrong"
      );

    }
  };


  return (

    <div className="
      min-h-screen
      bg-gray-100
      flex
      items-center
      justify-center
      p-6
    ">

      <form

        onSubmit={handleSubmit}

        className="
          bg-white
          p-8
          rounded-2xl
          shadow-lg
          w-full
          max-w-xl
        "
      >

        <h1 className="
          text-3xl
          font-bold
          text-blue-700
          mb-6
          text-center
        ">

          Create Doctor Profile

        </h1>


        {/* IMAGE */}
        <div className="mb-4">

          <label className="
            block
            mb-2
            font-semibold
          ">

            Doctor Image

          </label>

          <input

            type="file"

            accept="image/*"

            onChange={handleImageChange}

            className="
              w-full
              border
              p-3
              rounded-lg
            "
          />

        </div>


        {/* IMAGE PREVIEW */}
        {image && (

          <div className="
            flex
            justify-center
            mb-4
          ">

            <img

              src={URL.createObjectURL(image)}

              alt="preview"

              className="
                w-32
                h-32
                rounded-full
                object-cover
                border-4
                border-blue-200
              "
            />

          </div>

        )}


        {/* SPECIALIZATION */}
        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          value={formData.specialization}
          onChange={handleChange}
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-4
          "
          required
        />


        {/* EXPERIENCE */}
        <input
          type="number"
          name="experience"
          placeholder="Experience"
          value={formData.experience}
          onChange={handleChange}
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-4
          "
          required
        />


        {/* CERTIFICATE */}
        <input
          type="text"
          name="certificate"
          placeholder="Certificate File Name"
          value={formData.certificate}
          onChange={handleChange}
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-4
          "
          required
        />


        {/* CONSULTATION FEE */}
        <input
          type="number"
          name="consultationFee"
          placeholder="Consultation Fee"
          value={formData.consultationFee}
          onChange={handleChange}
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-4
          "
          required
        />


        {/* TIMINGS */}
        <input
          type="text"
          name="timings"
          placeholder="10 AM - 2 PM"
          value={formData.timings}
          onChange={handleChange}
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-6
          "
          required
        />


        {/* BUTTON */}
        <button
          type="submit"
          className="
            w-full
            bg-blue-700
            text-white
            py-3
            rounded-lg
            hover:bg-blue-800
          "
        >

          Create Profile

        </button>


        {/* MESSAGE */}
        {message && (

          <p className="
            text-center
            mt-4
            font-semibold
          ">

            {message}

          </p>

        )}

      </form>

    </div>
  );
};

export default CreateDoctorProfile;