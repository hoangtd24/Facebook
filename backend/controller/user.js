const { validateEmail, validateLength } = require("../helpers/validation");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createToken } = require("../helpers/tokens");
const { sendVerificationEmail } = require("../helpers/mailer");
exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      username,
      email,
      password,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Email không tồn tại",
      });
    }
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message: "Email này đã được đăng kí, vui lòng thử một email khác",
      });
    }
    if (!validateLength(first_name, 3, 30)) {
      return res.status(400).json({
        message: "Chiều dài chuỗi từ 3-30",
      });
    }
    if (!validateLength(last_name, 3, 30)) {
      return res.status(400).json({
        message: "Chiều dài chuỗi từ 3-30",
      });
    }
    if (!validateLength(password, 6, 40)) {
      return res.status(400).json({
        message: "Chiều dài của mật khẩu ít nhất phải 6 kí tự",
      });
    }

    const bcryptPassword = await bcrypt.hash(password, 12);
    let tempUsername = first_name + " " + last_name;
    const user = await new User({
      first_name,
      last_name,
      username: tempUsername,
      email,
      password: bcryptPassword,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();
    const emailVerificationToken = createToken({id: user._id}, "30m")
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`

    sendVerificationEmail(user.email, user.username, url)
    const token = createToken({id: user._id}, "1d")
    res.send({
      id: user._id,
      username: user.username,
      firstname: user.first_name,
      lastname: user.last_name,
      email:user.email,
      picture: user.picture,
      verified: user.verified,
      token: token,
      message: "Đăng kí thành công ! Kích hoạt email của bạn để bắt đầu sử dụng"
    })
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
