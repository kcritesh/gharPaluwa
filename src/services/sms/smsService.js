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
