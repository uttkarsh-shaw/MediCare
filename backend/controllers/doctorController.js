const Doctor = require("../models/doctor");


// ==========================================
// CREATE DOCTOR PROFILE
// ==========================================
const createDoctorProfile =
async (req, res) => {

  try {

    const {

      specialization,

      experience,

      certificate,

      consultationFee,

      timings,

      availability,

    } = req.body;


    // CLOUDINARY IMAGE URL
    const image =
      req.file?.path || "";


    // CHECK PROFILE EXISTS
    const existingDoctor =
      await Doctor.findOne({

        user: req.user._id,

      });


    if (existingDoctor) {

      return res.status(400).json({

        message:
          "Doctor profile already exists",

      });

    }


    // CREATE PROFILE
    const doctor =
      await Doctor.create({

        user: req.user._id,

        specialization,

        experience,

        certificate,

        consultationFee,

        timings,

        availability,

        image,

        approvalStatus: "pending",

      });


    res.status(201).json({

      message:
        "Doctor Profile Created Successfully",

      doctor,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Server Error",

    });

  }
};



// ==========================================
// GET APPROVED DOCTORS
// PUBLIC DOCTORS PAGE
// ==========================================
const getApprovedDoctors =
async (req, res) => {

  try {

    const doctors =
      await Doctor.find({

        approvalStatus:
          "approved",

      })

      .populate(
        "user",
        "name email"
      )

      .sort({
        createdAt: -1,
      });


    res.status(200).json(
      doctors
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Server Error",

    });

  }
};



// ==========================================
// GET MY DOCTOR PROFILE
// DOCTOR DASHBOARD
// ==========================================
const getDoctorProfile =
async (req, res) => {

  try {

    const doctor =
      await Doctor.findOne({

        user: req.user._id,

      })

      .populate(
        "user",
        "name email"
      );


    if (!doctor) {

      return res.status(404).json({

        message:
          "Doctor profile not found",

      });

    }


    res.status(200).json(
      doctor
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Server Error",

    });

  }
};



// ==========================================
// GET PENDING DOCTORS
// ==========================================
const getPendingDoctors =
async (req, res) => {

  try {

    const doctors =
      await Doctor.find({

        approvalStatus:
          "pending",

      })

      .populate(
        "user",
        "name email"
      )

      .sort({
        createdAt: -1,
      });


    res.status(200).json(
      doctors
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Server Error",

    });

  }
};



// ==========================================
// GET ALL DOCTORS
// ADMIN DASHBOARD
// ==========================================
const getAllDoctors =
async (req, res) => {

  try {

    const doctors =
      await Doctor.find()

      .populate(
        "user",
        "name email"
      )

      .sort({
        createdAt: -1,
      });


    res.status(200).json(
      doctors
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Server Error",

    });

  }
};



// ==========================================
// APPROVE DOCTOR
// ==========================================
const approveDoctor =
async (req, res) => {

  try {

    const doctor =
      await Doctor.findById(
        req.params.id
      );


    if (!doctor) {

      return res.status(404).json({

        message:
          "Doctor not found",

      });

    }


    doctor.approvalStatus =
      "approved";


    await doctor.save();


    res.status(200).json({

      message:
      "Doctor Approved Successfully",

      doctor,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Server Error",

    });

  }
};



// ==========================================
// REJECT DOCTOR
// ==========================================
const rejectDoctor =
async (req, res) => {

  try {

    const doctor =
      await Doctor.findById(
        req.params.id
      );


    if (!doctor) {

      return res.status(404).json({

        message:
          "Doctor not found",

      });

    }


    doctor.approvalStatus =
      "rejected";


    await doctor.save();


    res.status(200).json({

      message:
      "Doctor Rejected Successfully",

      doctor,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Server Error",

    });

  }
};




// ==========================================
// UPDATE DOCTOR PROFILE
// ==========================================
const updateDoctorProfile =
async (req, res) => {

  try {

    const {

      timings,

      consultationFee,

      availability,

    } = req.body;


    // IMAGE URL
    const image =
      req.file?.path;


    // FIND DOCTOR
    const doctor =
      await Doctor.findOne({

        user: req.user._id,

      });


    if (!doctor) {

      return res.status(404).json({

        message:
          "Doctor not found",

      });

    }


    // UPDATE FIELDS
    doctor.timings =
      timings;

    doctor.consultationFee =
      consultationFee;

    doctor.availability =
      availability;


    // UPDATE IMAGE
    if (image) {

      doctor.image =
        image;

    }


    // SAVE
    await doctor.save();


    res.status(200).json({

      message:
      "Profile Updated Successfully",

      doctor,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Server Error",

    });

  }
};



// ==========================================
// EXPORTS
// ==========================================
module.exports = {

  createDoctorProfile,

  getApprovedDoctors,

  getDoctorProfile,

  getPendingDoctors,

  getAllDoctors,

  approveDoctor,

  rejectDoctor,

  updateDoctorProfile,

};