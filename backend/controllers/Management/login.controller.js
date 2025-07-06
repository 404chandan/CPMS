const User = require("../../models/user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 

const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and Password are required!" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User does not exist!" });
    }

    if (user.role !== "management_admin") {
      return res.status(400).json({ msg: "Access denied. Not a management user." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect password!" });
    }

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    user.token = token;
    await user.save();

    return res.status(200).json({ token });

  } catch (error) {
    console.error("Error in management login controller:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = Login;
