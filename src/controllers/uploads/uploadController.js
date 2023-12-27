import * as uploadService from "../../services/uploads/uploadService1.js";

const getSignedUrl = async (req, res) => {
  try {
    const { type, domain } = req.params;
    const signedUrl = await uploadService.getPresignedUrl(type, domain);

    res.json({ signedUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getSignedUrl };
