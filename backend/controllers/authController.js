const bcrypt = require("bcryptjs");

const User = require("../models/User");

const generateToken = require("../utils/generateToken");


// REGISTER USER
const registerUser = async (req, res) => {

  try {

    const { name, email, password, role } = req.body;

    // CHECK EXISTING USER
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // CREATE USER
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // RESPONSE
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }
};


// LOGIN USER
const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    // FIND USER
    const user = await User.findOne({ email });

    // CHECK USER + PASSWORD
    if (
      user &&
      (await bcrypt.compare(password, user.password))
    ) {

      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });

    } else {

      res.status(401).json({
        message: "Invalid email or password",
      });

    }

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }
};



// GET USER PROFILE
const getUserProfile = async (req, res) => {

  res.status(200).json(req.user);  //middleware se req.user me user ka data aa jayega, usko json me bhej diya jayega

};



// ADMIN LOGIN
const adminLogin = async (req, res) => {

  try {

    const { email, password } =
      req.body;


    // CHECK EMAIL
    if (
      email !== process.env.ADMIN_EMAIL
    ) {

      return res.status(401).json({
        message: "Invalid Admin Email",
      });

    }


    // CHECK PASSWORD
    if (
      password !==
      process.env.ADMIN_PASSWORD
    ) {

      return res.status(401).json({
        message: "Invalid Admin Password",
      });

    }


    // CREATE ADMIN DATA
    const adminData = {

      name: "Admin",

      email: process.env.ADMIN_EMAIL,

      role: "admin",

      token: generateToken("admin123"),

    };


    res.status(200).json(adminData);

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }
};


module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  adminLogin
};