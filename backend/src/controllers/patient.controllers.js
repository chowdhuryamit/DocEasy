import { Patient } from "../models/patient.model.js";

//register controller
const registerPatient = async (req, res) => {
  const { name, phone, password } = req.body;

  if (name === "" || phone === "" || password === "") {
    return res
      .status(200)
      .json({ success: false, msg: "all fields are required" });
  }

  try {
    const existingPatient = await Patient.findOne({ phone });

    if (existingPatient) {
      return res
        .status(200)
        .json({ success: false, msg: "phone no already in use" });
    }

    const patient = await Patient.create({
      name: name,
      password: password,
      phone: phone,
    });

    if (patient) {
      return res.status(201).json({
        success: true,
        msg: "Account created successfully",
        patient,
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: "error occured while searching for existing patient or creating new patinent",
    });
  }
};

//login controller
const loginPatient = async (req, res) => {
  const { phone, password } = req.body;

  if (phone === "" || password === "") {
    return res
      .status(200)
      .json({ success: false, msg: "all fields are required" });
  }

  try {
    const patient = await Patient.findOne({ phone });

    if (!patient) {
      return res
        .status(200)
        .json({ success: false, msg: "patient is not registered" });
    }

    const isPasswordValid = await patient.isPasswordCorrect(password);

    if (isPasswordValid === false) {
      return res
        .status(200)
        .json({ success: false, msg: "password is incorrect" });
    }

    const accessToken = await patient.generateAccessToken();

    if (!accessToken) {
      return res
        .status(200)
        .json({ success: false, msg: "access token is not generated" });
    }
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    };

    const loggedInPatient = await Patient.findById(patient._id).select(
      "-password"
    );

    return res
      .status(201)
      .cookie("accessToken", accessToken, options)
      .json({
        success: true,
        msg: "patient logged in successfully",
        loggedInPatient,
      });
  } catch (error) {
    return res
      .status(400)
      .json({
        success: false,
        msg: "error occured while searching for existing patient or validating password",
      });
  }
};

//logout controller
const logoutPatient = async (req, res) => {
  if (req.patient === null) {
    return res
      .status(200)
      .json({ success: false, msg: "patient is not logged in" });
  }

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json({ success: true, msg: "patient logged out successfully" });
};

const getPatient = async (req, res) => {
  if (req.patient === null) {
    return res
      .status(200)
      .json({ success: false, msg: "patient is not logged in" });
  }

  try {
    const patientData = await Patient.findById(req.patient._id).select(
      "-password"
    );

    if (!patientData) {
      return res.status(200).json({ success: false, msg: "patient not found" });
    }

    return res
      .status(200)
      .json({ success: true, msg: "patient found", patientData });
  } catch (error) {
    return res.status(400).json({ success: false, msg: "patient not found" });
  }
};

export { registerPatient, loginPatient, logoutPatient, getPatient };
