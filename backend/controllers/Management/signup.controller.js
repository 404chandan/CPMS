const User = require("../../models/user.model");
const bcrypt = require("bcrypt");

const SignupManagement = async (req, res) => {
  const { first_name, email, number, password } = req.body;

  try {
    // Check if the user already exists
    if (await User.findOne({ email })) {
      return res.status(400).json({ msg: "User Already Exists!" });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new management user
    const newUser = new User({
      first_name: first_name,
      email: email,
      number: number,
      password: hashPassword,
      role: "management_admin", // set correct role
    });

    await newUser.save();

    return res.status(201).json({ msg: "Management User Created!" });
  } catch (error) {
    console.error("management.signup.controller.js =>", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};

module.exports = SignupManagement;
