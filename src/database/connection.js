/* eslint-disable no-console */
import { connect } from "mongoose";

const connectDb = (url) => {
  connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log("connection sucessfull");
    })
    .catch((e) => {
      console.log("not connected");
      console.log(e);
    });
};

export default connectDb;
