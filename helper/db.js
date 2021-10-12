const express = require("express");
const mongoose = require("mongoose");

module.exports = () => {
  const uri =
    "mongodb+srv://jamoliddin:qwerty750@cluster0.gwyys.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

  mongoose.connect(uri, {
    useNewUrlParser: true,
  });

  const db = mongoose.connection;

  db.on("open", () => {
    console.log("server running");
  });

  db.on("error", () => {
    console.log("server error");
  });
};
