const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;

mongoose.connect(
  `mongodb+srv://diksha-deep:${process.env.DB_PW}@cluster0-v8wlx.mongodb.net/test?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);
mongoose.Promise = global.Promise;


const uri = `mongodb+srv://diksha-deep:${process.env.DB_PW}@cluster0-v8wlx.mongodb.net/test?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  if(err) {
    console.log('WE got an error: ', err)
  }  
  const collection = client.db("gotGame").collection("battles");
  console.log('We are connected')
  // perform actions on the collection object
  client.close();
});


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
app.use("/list", battleListRoutes);

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
