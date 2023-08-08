import * as UserServices from "../../services/user/userServices.js";

export const getUserDetails = async (req, res) => {
  const { userId } = req.User;
  try {
    const user = await UserServices.getUserDetails(userId);
    return res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
