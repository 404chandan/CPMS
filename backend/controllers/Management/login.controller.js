const User = require("../../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User Doesn't Exist!" });
    }

    // Check if role matches (management_admin or student)
    if (user.role !== role) {
      return res.status(403).json({ msg: `Access Denied! Not a ${role} user.` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credentials Not Matched!' });
    }

    const payload = { userId: user.id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    user.token = token;
    await user.save();

    return res.json({
      msg: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.first_name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    console.log("login.controller.js => ", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};

module.exports = Login;
