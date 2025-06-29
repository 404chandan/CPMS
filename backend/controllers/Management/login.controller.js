// const User = require("../../models/user.model");
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');


// const Login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(400).json({ msg: "User Doesn't Exist!" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch || user.role !== "management_admin")
//       return res.status(400).json({ msg: 'Credentials Not Matched!' });

//     const payload = { userId: user.id };
//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

//     user.token = token;
//     await user.save();
    
//     return res.json({ token });
//   } catch (error) {
//     console.log("student.login.controller.js => ", error);
//     return res.status(500).json({ msg: "Internal Server Error!" });
//   }
// }

// module.exports = Login;

const User = require("../../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // ✅ Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and Password are required!" });
    }

    // ✅ Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User does not exist!" });
    }

    // ✅ Check if the role is management_admin
    if (user.role !== "management_admin") {
      return res.status(400).json({ msg: "Access denied. Not a management user." });
    }

    // ✅ Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect password!" });
    }

    // ✅ Generate JWT token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // ✅ Optionally save token in the user model (if needed)
    user.token = token;
    await user.save();

    // ✅ Return token in response
    return res.status(200).json({ token });

  } catch (error) {
    console.error("Error in management login controller:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = Login;
