const express = require("express");
const mongoose = require("mongoose");

const connectDb = (url) => {
   mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,


   }).then(() => {
      console.log("connection sucessfull");
   }).catch((e) => {
      console.log("not connected");
      console.log(e);
   })

}

module.exports = connectDb;