const { validateEmail, validateLength } = require("../helpers/validation");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createToken } = require("../helpers/tokens");
const { sendVerificationEmail, sendResetCode } = require("../helpers/mailer");
const Code = require("../models/Code");
const generateCode = require("../helpers/generateCode");
const Post = require("../models/Post");
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
        message: "Chiều dài chuỗi Họ nên từ 3-30",
      });
    }
    if (!validateLength(last_name, 3, 30)) {
      return res.status(400).json({
        message: "Chiều dài chuỗi Tên nên từ 3-30",
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

    await sendVerificationEmail(user.email, user.username, url);
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
      if (check) {
        const token = createToken({ id: user._id }, "2d");
        res.send({
          id: user._id,
          username: user.username,
          firstname: user.first_name,
          lastname: user.last_name,
          email: user.email,
          picture: user.picture,
          cover: user.cover,
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

exports.findUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(200).json({
        email: user.email,
        picture: user.picture,
      });
    } else {
      return res.status(400).json({
        message: "Tài khoản không tồn tại. Vui lòng thử lại!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.sendResetPasswordCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    await Code.findOneAndRemove({ user: user._id });
    const code = generateCode(6);

    const saveCode = await new Code({
      code,
      user: user._id,
    }).save();
    await sendResetCode(user.email, user.last_name, code);
    return res.status(200).json({
      message: "Mã đã được gửi tới email của bạn",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.validateCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });
    const dbCode = await Code.findOne({ user: user._id });
    console.log(dbCode);
    if (dbCode.code === code) {
      return res.status(200).json({
        message: "ok",
      });
    } else {
      return res.status(400).json({
        message: "Code bạn nhập chưa chính xác",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.changePassword = async (req, res) => {
  const { email, password } = req.body;
  const bcryptPassword = await bcrypt.hash(password, 12);
  await User.findOneAndUpdate(email, { password: bcryptPassword });
  return res.status(200).json({
    message: "ok",
  });
};

exports.getProfile = async (req, res) => {
  try {
    const { idUser } = req.params;
    const profile = await User.findById(idUser).select("-password");

    const posts = await Post.find({ user: profile._id })
      .populate("user")
      .sort({ createdAt: -1 });
    return res.status(200).json({ ...profile.toObject(), posts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateProfilePicture = async (req, res) => {
  try {
    const { url } = req.body;
    await User.findByIdAndUpdate(req.user.id, { picture: url });
    return res.json(url);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateCoverPicture = async (req, res) => {
  try {
    const { url } = req.body;
    await User.findByIdAndUpdate(req.user.id, { cover: url });
    return res.json(url);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateDetails = async (req, res) => {
  try {
    const { infos } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { details: infos },
      { new: true }
    );
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
