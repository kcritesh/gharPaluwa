import Users from "../../models/User.js";

const getUserDetails = async (userId) => {
  try {
    // In a real-world scenario, you would query the database to get the user details
    // For this example, we'll assume you have access to the user object based on the userId
    const user = await Users.findById(userId);

    if (!user) {
      throw new Error("User Not Found");
    }

    // Return the user details
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

// eslint-disable-next-line import/prefer-default-export
export { getUserDetails };
