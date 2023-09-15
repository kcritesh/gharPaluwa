export const checkBalance = async () => {
  try {
    const data = await fetch("https://sms.sociair.com/api/balance", {
      headers: {
        Authorization: "Bearer " + process.env.SOCIAR_API_KEY,
      },
    });
    const response = await data.json();
    const { balance } = response;
    console.log(balance);
    return balance;
  } catch (error) {
    console.log("Error in check balance", error);
    throw new Error(error);
  }
};

export const sendSMS = async (to, message) => {
  try {
    const data = await fetch("https://sms.sociair.com/api/send", {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + process.env.SOCIAR_API_KEY,
      },
      body: JSON.stringify({
        mobile: to,
        message: message,
      }),
    });
    const response = await data.json();
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
