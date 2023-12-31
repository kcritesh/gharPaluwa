/* eslint-disable import/prefer-default-export */
import * as uploadService from '../../services/uploads/uploadService1.mjs';

const getSignedUrl = async (req, res) => {
  try {
    const { type, domain } = req.params;
    const { url, objectKey } = await uploadService.getPresignedUrl(
      type,
      domain
    );
    res.json({ url, objectKey });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getSignedUrl };
