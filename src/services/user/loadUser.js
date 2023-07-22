import Users from "../../models/User.js";

const getUserDetails = async (req, res) => {
    const userId = req.user.userId;
  
    try {
      // In a real-world scenario, you would query the database to get the user details
      // For this example, we'll assume you have access to the user object based on the userId
      const user = await Users.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Return the user details
      return res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  export { getUserDetails };