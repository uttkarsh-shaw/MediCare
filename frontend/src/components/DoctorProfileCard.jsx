const DoctorProfileCard = ({

  doctor,

  editMode,

  setEditMode,

  timings,

  setTimings,

  consultationFee,

  setConsultationFee,

  availability,

  setAvailability,

  updateProfile,

  image,

  setImage,

}) => {

  return (

    <>

      {/* PROFILE CARD */}
      <div className="
        bg-white
        rounded-2xl
        shadow-lg
        p-8
        mb-10
      ">

        {/* TOP SECTION */}
        <div className="
          flex
          flex-col
          lg:flex-row
          gap-8
          items-start
          mb-10
        ">

          {/* IMAGE */}
          <div className="
            flex
            flex-col
            items-center
          ">

            <img

              src={

                image

                  ? URL.createObjectURL(image)

                  : doctor.image ||

                  "https://cdn-icons-png.flaticon.com/512/3774/3774299.png"

              }

              alt="doctor"

              className="
                w-44
                h-44
                rounded-2xl
                object-cover
                border-4
                border-blue-100
                shadow-md
              "
            />


            {/* IMAGE INPUT */}
            {editMode && (

              <div className="mt-4">

                <input

                  type="file"

                  accept="image/*"

                  onChange={(e) =>

                    setImage(
                      e.target.files[0]
                    )

                  }

                  className="
                    border
                    p-2
                    rounded-lg
                    w-full
                  "
                />

              </div>

            )}

          </div>


          {/* STATUS + INFO */}
          <div className="flex-1">

            {/* STATUS */}
            <div className="
              flex
              items-center
              justify-between
              flex-wrap
              gap-4
              mb-8
            ">

              <div>

                <h2 className="
                  text-3xl
                  font-bold
                  text-gray-800
                ">

                  Dr. {doctor.user.name}

                </h2>

                <p className="
                  text-gray-500
                  mt-1
                ">

                  {doctor.user.email}

                </p>

              </div>


              <div className={`
                px-6
                py-3
                rounded-full
                text-white
                font-semibold
                text-lg

                ${doctor.approvalStatus === "approved"

                  ? "bg-green-600"

                  : "bg-yellow-500"

                }
              `}>

                {doctor.approvalStatus}

              </div>

            </div>


            {/* INFO GRID */}
            <div className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-8
            ">

              {/* SPECIALIZATION */}
              <div>

                <p className="
                  text-gray-500
                  text-sm
                  mb-1
                ">

                  Specialization

                </p>

                <h3 className="
                  text-xl
                  font-bold
                  text-gray-800
                ">

                  {doctor.specialization}

                </h3>

              </div>


              {/* EXPERIENCE */}
              <div>

                <p className="
                  text-gray-500
                  text-sm
                  mb-1
                ">

                  Experience

                </p>

                <h3 className="
                  text-xl
                  font-bold
                  text-gray-800
                ">

                  {doctor.experience} Years

                </h3>

              </div>


              {/* FEE */}
              <div>

                <p className="
                  text-gray-500
                  text-sm
                  mb-1
                ">

                  Consultation Fee

                </p>

                {

                  editMode ? (

                    <input

                      type="number"

                      value={consultationFee}

                      onChange={(e) =>

                        setConsultationFee(
                          e.target.value
                        )

                      }

                      className="
                        border
                        p-3
                        rounded-xl
                        w-full
                      "
                    />

                  ) : (

                    <h3 className="
                      text-xl
                      font-bold
                      text-gray-800
                    ">

                      ₹{doctor.consultationFee}

                    </h3>

                  )

                }

              </div>


              {/* TIMINGS */}
              <div>

                <p className="
                  text-gray-500
                  text-sm
                  mb-1
                ">

                  Timings

                </p>

                {

                  editMode ? (

                    <input

                      type="text"

                      value={timings}

                      onChange={(e) =>

                        setTimings(
                          e.target.value
                        )

                      }

                      className="
                        border
                        p-3
                        rounded-xl
                        w-full
                      "
                    />

                  ) : (

                    <h3 className="
                      text-xl
                      font-bold
                      text-gray-800
                    ">

                      {doctor.timings}

                    </h3>

                  )

                }

              </div>


              {/* AVAILABILITY */}
              <div>

                <p className="
                  text-gray-500
                  text-sm
                  mb-1
                ">

                  Availability

                </p>

                {

                  editMode ? (

                    <select

                      value={availability}

                      onChange={(e) =>

                        setAvailability(
                          e.target.value === "true"
                        )

                      }

                      className="
                        border
                        p-3
                        rounded-xl
                        w-full
                      "
                    >

                      <option value={true}>
                        Available
                      </option>

                      <option value={false}>
                        Unavailable
                      </option>

                    </select>

                  ) : (

                    <h3 className={`
                      text-xl
                      font-bold

                      ${doctor.availability

                        ? "text-green-600"

                        : "text-red-600"

                      }
                    `}>

                      {

                        doctor.availability

                          ? "Available"

                          : "Unavailable"

                      }

                    </h3>

                  )

                }

              </div>


              {/* CERTIFICATE */}
              <div>

                <p className="
                  text-gray-500
                  text-sm
                  mb-1
                ">

                  Certificate

                </p>

                <h3 className="text-lg font-semibold text-gray-800 break-words">

                  {doctor.certificate}

                </h3>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* BUTTONS */}
      <div className="
        flex
        gap-4
        mb-8
      ">

        {!editMode ? (

          <button

            onClick={() =>
              setEditMode(true)
            }

            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-3
              rounded-xl
              font-semibold
              transition
            "
          >

            Edit Profile

          </button>

        ) : (

          <button

            onClick={updateProfile}

            className="
              bg-green-600
              hover:bg-green-700
              text-white
              px-6
              py-3
              rounded-xl
              font-semibold
              transition
            "
          >

            Save Changes

          </button>

        )}

      </div>

    </>

  );
};

export default DoctorProfileCard;