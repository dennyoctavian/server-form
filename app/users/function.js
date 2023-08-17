import User from "./models.js";

const emailIsAvailble = async (email) => {
  const user = await User.findOne({
    email: email,
  });
  if (user) {
    return false;
  } else {
    return true;
  }
};

export { emailIsAvailble };
