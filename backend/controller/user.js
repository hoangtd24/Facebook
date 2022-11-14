const { validateEmail, validateLength } = require("../helpers/validation");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createToken } = require("../helpers/tokens");
const { sendVerificationEmail } = require("../helpers/mailer");
exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
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
    const emailVerificationToken = createToken({ id: user._id }, "30m");
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;

    sendVerificationEmail(user.email, user.username, url);
    const token = createToken({ id: user._id }, "1d");
    res.send({
      id: user._id,
      username: user.username,
      firstname: user.first_name,
      lastname: user.last_name,
      email: user.email,
      picture: user.picture,
      verified: user.verified,
      token: token,
      message:
        "Đăng kí thành công ! Kích hoạt email của bạn để bắt đầu sử dụng",
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.activateAccount = async (req, res) => {
  try {
    const { token } = req.body;
    const user = jwt.verify(token, process.env.TOKEN_SECRET);

    const check = await User.findById(user.id);
    if (check.verified) {
      return res.status(400).json({
        message: "Email đã được kích hoạt",
      });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res.status(200).json({
        message: "Email vừa được kích hoạt thành công.",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email chưa được đăng kí",
      });
    } else {
      const check = await bcrypt.compare(password, user.password);
      console.log(check);
      if (check) {
        const token = createToken({ id: user._id }, "1d");
        res.send({
          id: user._id,
          username: user.username,
          firstname: user.first_name,
          lastname: user.last_name,
          email: user.email,
          picture: user.picture,
          verified: user.verified,
          token: token,
          message:
            "Đăng kí thành công ! Kích hoạt email của bạn để bắt đầu sử dụng",
        });
      } else {
        return res.status(400).json({
          message: "Mật khẩu không chính xác",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
