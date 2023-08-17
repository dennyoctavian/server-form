import User from "./models.js";
import bcrypt from "bcrypt";
import { emailIsAvailble } from "./function.js";

const register = async (req, res) => {
  try {
    let errorMessage = [];
    const { fullname, email, password } = req.body;

    if (!fullname) {
      errorMessage.push({ fullname: "Fullname is required" });
    } else if (!email) {
      errorMessage.push({ email: "Email is required" });
    } else if (!password) {
      errorMessage.push({ password: "Password is required" });
    }

    if (password.length < 6) {
      errorMessage.push({ password: "Password minimum 6 character" });
    }

    if (errorMessage.length > 0) {
      throw {
        code: 400,
        message: "body request wrong",
        data: errorMessage,
      };
    }
    const isEmailAvailble = await emailIsAvailble(email);
    if (!isEmailAvailble) {
      throw {
        code: 400,
        message: "Email already taken",
      };
    }
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    let user = await User.create({
      fullname: fullname,
      email: email,
      password: hash,
    });

    if (!user) {
      throw { code: 500, message: "Failed to create user" };
    }

    delete user.password;

    res.status(200).json({
      success: true,
      message: "Success create user",
      data: user,
    });
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: error.message,
      data: error.data,
    });
  }
};

export { register };
