const Appointment =
require("../models/Appointment");

const Doctor =
require("../models/doctor");

const sendEmail =
require("../utils/sendEmail");




// BOOK APPOINTMENT
const bookAppointment =
async (req, res) => {

  try {

    const {

      doctorId,

      appointmentDate,

      appointmentTime,

    } = req.body;



    const appointment =
      await Appointment.create({

        patient: req.user._id,

        doctor: doctorId,

        appointmentDate,

        appointmentTime,

      });



    res.status(201).json({

      message:
      "Appointment Booked Successfully",

      appointment,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Server Error",

    });

  }
};




// GET DOCTOR APPOINTMENTS
const getDoctorAppointments =
async (req, res) => {

  try {

    const doctor =
      await Doctor.findOne({

        user: req.user._id,

      });



    const appointments =
      await Appointment.find({

        doctor: doctor._id,

      })

      .populate(
        "patient",
        "name email"
      )

      .sort({
        createdAt: -1
      });



    res.status(200).json(
      appointments
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Server Error",

    });

  }
};




// UPDATE APPOINTMENT STATUS
const updateAppointmentStatus =
async (req, res) => {

  try {

    const { status } = req.body;



    const appointment =
      await Appointment.findById(
        req.params.id
      )

      .populate(
        "patient",
        "name email"
      );



    if (!appointment) {

      return res.status(404).json({

        message:
        "Appointment not found",

      });

    }




    appointment.status = status;

    await appointment.save();




    // SEND EMAIL WHEN APPROVED
    if (status === "approved") {

      await sendEmail(

        appointment.patient.email,

        "Appointment Approved - MediCore",

        `Hello ${appointment.patient.name},

Your appointment has been approved by the doctor.

You can now login to MediCore and complete payment to start your consultation.

Thank you for using MediCore.`
      );
    }




    res.status(200).json({

      message:
      "Appointment status updated",

      appointment,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Server Error",

    });

  }
};




// GET MY APPOINTMENTS
const getMyAppointments =
async (req, res) => {

  try {

    const appointments =
      await Appointment.find({

        patient: req.user._id,

      })

      .populate({

        path: "doctor",

        populate: {

          path: "user",

          select: "name email",

        },

      })

      .sort({

        createdAt: -1

      });



    res.status(200).json(
      appointments
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Server Error",

    });

  }
};




// ADD PRESCRIPTION
const addPrescription =
async (req, res) => {

  try {

    const {

      medicines,

      advice,

      tests,

    } = req.body;



    const appointment =
      await Appointment.findById(
        req.params.id
      )

      .populate(
        "patient",
        "name email"
      );



    if (!appointment) {

      return res.status(404).json({

        message:
        "Appointment not found",

      });

    }




    // SAVE PRESCRIPTION
    appointment.medicines =
      medicines;

    appointment.advice =
      advice;

    appointment.tests =
      tests;




    // MARK COMPLETED
    appointment.status =
      "completed";



    await appointment.save();




    // SEND COMPLETION EMAIL
    await sendEmail(

      appointment.patient.email,

      "Consultation Completed - MediCore",

      `Hello ${appointment.patient.name},

Your consultation has been completed successfully.

Prescription and medical advice are now available in your MediCore dashboard.

Thank you for using MediCore.`
    );




    res.status(200).json({

      message:
      "Prescription Added Successfully",

      appointment,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
      "Server Error",

    });

  }
};




// GET SINGLE APPOINTMENT
const getSingleAppointment =
async (req, res) => {

  try {

    const appointment =
      await Appointment.findById(

        req.params.id

      )

      // PATIENT DETAILS
      .populate(
        "patient",
        "name email"
      )

      // DOCTOR DETAILS
      .populate({

        path: "doctor",

        populate: {

          path: "user",

          select: "name email",

        },

      });



    if (!appointment) {

      return res.status(404).json({

        message:
        "Appointment not found",

      });

    }



    res.status(200).json(
      appointment
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
      "Server Error",

    });

  }
};




// DELETE APPOINTMENT
const deleteAppointment =
async (req, res) => {

  try {

    const appointment =
      await Appointment.findByIdAndDelete(
        req.params.id
      );

    if (!appointment) {

      return res.status(404).json({

        message:
        "Appointment not found",

      });

    }



    res.status(200).json({

      message:
      "Appointment deleted successfully",

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
      "Server Error",

    });

  }
};



module.exports = {

  bookAppointment,

  getDoctorAppointments,

  updateAppointmentStatus,

  getMyAppointments,

  addPrescription,

  getSingleAppointment,

  deleteAppointment,
};