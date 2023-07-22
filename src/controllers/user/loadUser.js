import * as LoadUserService from "../../services/user/loadUser.js"; 



const getUserDetails = async (req, res) => {
  try {
    const user = await LoadUserService.getUserDetails(req, res);
    return res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default {getUserDetails} ;
