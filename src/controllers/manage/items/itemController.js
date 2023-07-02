const items = [
  {
    username: "kritisha",
    nickname: "kriti",
    role: "buyer",
  },
  {
    username: "ritesh59",
    nickname: "tester",
    role: "seller",
  },
  {
    username: "sayara",
    nickname: "saya",
    role: "buyer",
  },
];
const getItem = (req, res) => {
  res.json(items.filter((item) => item.username === req.User.name));
};

export { getItem };
