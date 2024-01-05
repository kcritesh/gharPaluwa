export const checkBalance = async () => {
  try {
    const data = await fetch("https://sms.sociair.com/api/balance", {
      headers: {
        Authorization: `Bearer ${process.env.SOCIAR_API_KEY}`,
      },
    });
    const response = await data.json();
    const { balance } = response;
    // console.log(balance);
    return balance;
  } catch (error) {
    // console.log("Error in check balance", error);
    throw new Error(error);
  }
};

export const sendSMS = async (to, message) => {
  try {
    const data = await fetch("https://sms.sociair.com/api/sms", {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.SOCIAR_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        mobile: to,
      }),
    });
    const response = await data.json();
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

// Generate OTP

export const generateOTP = () => {
  const digits = "0123456789";
  let OTP = "";
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};
