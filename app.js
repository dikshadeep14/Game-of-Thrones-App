const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
// const uri = `mongodb+srv://diksha-deep:${process.env.MONGO_ATLAS_PW}@cluster0-v8wlx.mongodb.net/test?retryWrites=true&w=majority`
console.log("line 8 "+process.env.MONGO_ATLAS_PW);
try{
  mongoose.connect(
    `mongodb+srv://diksha-deep:${process.env.MONGO_ATLAS_PW}@cluster0-v8wlx.mongodb.net/gotGame?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  );
}
catch(error){
  console.log("error in line 14 "+error);
}

mongoose.Promise = global.Promise;

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://diksha-deep:"+process.env.MONGO_ATLAS_PW+"@cluster0-v8wlx.mongodb.net/gotGame?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
// client.connect(err => {
//   const collection = client.db("gotGame").collection("battles");;
//   // perform actions on the collection object
//   client.close();
// });
const battleListRoutes = require('./api/routes/battles');

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE, PUT");
    return res.status(200).json({});
  }
  next();
});

//  Routes which handles the request;
app.use("/battles", battleListRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");

  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
