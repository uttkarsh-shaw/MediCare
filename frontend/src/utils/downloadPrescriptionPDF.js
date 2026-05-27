import jsPDF
from "jspdf";

const downloadPrescriptionPDF =
(appointment) => {

  const doc = new jsPDF();

  doc.setFontSize(22);

  doc.text(
    "Medical Prescription",
    20,
    20
  );


  doc.setFontSize(14);

  doc.text(

    `Doctor: Dr. ${
      appointment?.doctor
      ?.user?.name
    }`,

    20,

    40

  );


  doc.text(

    `Date: ${
      appointment
      ?.appointmentDate
    }`,

    20,

    50

  );


  doc.text(

    `Time: ${
      appointment
      ?.appointmentTime
    }`,

    20,

    60

  );


  doc.text(
    "Medicines:",
    20,
    80
  );


  appointment
  ?.medicines
  ?.forEach(

    (
      medicine,
      index
    ) => {

      doc.text(

        `- ${medicine}`,

        30,

        90 + (index * 10)

      );

    }

  );


  doc.text(

    `Advice: ${
      appointment?.advice
    }`,

    20,

    140

  );


  doc.text(

    `Tests: ${
      appointment?.tests
    }`,

    20,

    160

  );


  doc.save(
    "prescription.pdf"
  );

};

export default
downloadPrescriptionPDF;