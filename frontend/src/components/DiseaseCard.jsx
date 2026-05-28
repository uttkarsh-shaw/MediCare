const DiseaseCard = ({ item }) => {

  return (

    <div className="
      bg-white
      rounded-3xl
      overflow-hidden
      shadow-lg
      hover:shadow-2xl
      transition-all
      duration-300
      group
      border
      border-gray-100
    ">

      {/* IMAGE SECTION */}
      <div
        className="
          relative
          h-64
          bg-cover
          bg-center
        "

        style={{
          backgroundImage:
            `url(${item.image})`,
        }}
      >

        {/* DARK OVERLAY */}
        <div className="
          absolute
          inset-0
          bg-black/45
        " />

        {/* CONTENT */}
        <div className="
          absolute
          bottom-0
          left-0
          p-6
          text-white
          z-10
        ">

          <div className="
            text-5xl
            mb-4
          ">

            {item.icon}

          </div>

          <h2 className="
            text-3xl
            font-bold
            mb-2
          ">

            {item.disease}

          </h2>

          <p className="
            text-white/90
            font-medium
            text-lg
          ">

            {item.doctor}

          </p>

        </div>

      </div>

      {/* BOTTOM */}
      <div className="
        p-6
      ">

        <p className="
          text-gray-600
          leading-8
          mb-6
        ">

          {item.description}

        </p>

        <button className="
          w-full
          bg-blue-600
          hover:bg-blue-700
          text-white
          py-3
          rounded-2xl
          font-semibold
          transition-all
          duration-300
        ">

          Consult {item.doctor}

        </button>

      </div>

    </div>

  );
};

export default DiseaseCard;