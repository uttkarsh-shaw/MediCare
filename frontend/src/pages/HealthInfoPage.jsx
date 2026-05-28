import {
  FaHeartbeat,
  FaBrain,
  FaEye,
  FaTooth,
  FaBone,
  FaChild,
  FaLungs,
  FaAllergies,
} from "react-icons/fa";

import DiseaseCard
from "../components/DiseaseCard";

const diseases = [

  {
    id: 1,

    disease:
      "Fever & Cold",

    doctor:
      "General Physician",

    description:
      "Treatment for fever, cold, weakness, viral infection and cough.",

    icon:
      <FaHeartbeat />,

    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309",
  },

  {
    id: 2,

    disease:
      "Heart Problems",

    doctor:
      "Cardiologist",

    description:
      "Heart pain, blood pressure and cardiac related treatment.",

    icon:
      <FaHeartbeat />,

    image:
      "https://images.unsplash.com/photo-1628348070889-cb656235b4eb",
  },

  {
    id: 3,

    disease:
      "Skin Allergy",

    doctor:
      "Dermatologist",

    description:
      "Skin infection, allergy, pores, acne and itching treatment.",

    icon:
      <FaAllergies />,

    image:
      "https://images.unsplash.com/photo-1559599101-f09722fb4948?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 4,

    disease:
      "Eye Problems",

    doctor:
      "Ophthalmologist",

    description:
      "Eye infection, blurry vision and cataract treatment.",

    icon:
      <FaEye />,

    image:
      "https://images.unsplash.com/photo-1581595219315-a187dd40c322",
  },

  {
    id: 5,

    disease:
      "Dental Problems",

    doctor:
      "Dentist",

    description:
      "Tooth pain, cavities and gum treatment.",

    icon:
      <FaTooth />,

    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5",
  },

  {
    id: 6,

    disease:
      "Bone & Joint Pain",

    doctor:
      "Orthopedic",

    description:
      "Fracture, arthritis and bone-related treatment.",

    icon:
      <FaBone />,

    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
  },

  {
    id: 7,

    disease:
      "Mental Stress",

    doctor:
      "Psychiatrist",

    description:
      "Depression, stress and mental health consultation.",

    icon:
      <FaBrain />,

    image:
      "https://images.unsplash.com/photo-1493836512294-502baa1986e2",
  },

  {
    id: 8,

    disease:
      "Child Health",

    doctor:
      "Pediatrician",

    description:
      "Healthcare and treatment for children and babies.",

    icon:
      <FaChild />,

    image:
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
  },

  {
    id: 9,

    disease:
      "Breathing Problems",

    doctor:
      "Pulmonologist",

    description:
      "Asthma, breathing problems and lung infection treatment.",

    icon:
      <FaLungs />,

    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
  },

];

const HealthInfoPage = () => {

  return (

    <div className="
      min-h-screen
      bg-gray-100
      px-4
      sm:px-6
      py-10
      overflow-x-hidden
    ">

      {/* HEADING */}
      <div className="
        text-center
        mb-14
        max-w-4xl
        mx-auto
      ">

        <h1 className="
          text-3xl
          sm:text-5xl
          font-bold
          text-blue-700
          mb-4
          leading-tight
        ">

          Health Information 🏥

        </h1>

        <p className="
          text-gray-600
          text-base
          sm:text-lg
          max-w-3xl
          mx-auto
          leading-8
        ">

          Find the right doctor for different
          diseases and health problems.

        </p>

      </div>

      {/* CARDS */}
      <div className="
        max-w-7xl
        mx-auto
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-8
        items-stretch
      ">

        {diseases.map((item) => (

          <DiseaseCard
            key={item.id}
            item={item}
          />

        ))}

      </div>

    </div>

  );
};

export default HealthInfoPage;