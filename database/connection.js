import express from "express";
import { connect } from "mongoose";

const connectDb = (url) => {
<<<<<<< HEAD
   console.log(url);
   connect(url, {
=======
   
   mongoose.connect(url, {
>>>>>>> a78dfab939b6be568cf522e93648df3189f94530
      useNewUrlParser: true,
      useUnifiedTopology: true,
   }).then(() => {

      console.log("connection sucessfull");
   }).catch((e) =>
    {
      console.log("not connected");
      console.log(e);
   })

}

export default connectDb;