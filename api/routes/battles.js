const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Battles = require("../models/battle");

//  get all the battles list
router.get("/", (req, res, next) => {
  Battles.find()
    .select()
    .exec()
    .then(docs => {
    
      const response = {
        count: docs.length,
        list: docs,
        options: {
          kings: [...new Set(docs.map(doc => {
            return doc.attacker_king, doc.defender_king;
        }))],
        battle_type: [...new Set(docs.map(doc => {
          return doc.battle_type
      }))],
      location: [...new Set(docs.map(doc => {
        return doc.location
    }))],
    request: {
      type: "GET",
      url: `http://localhost:3002/battles`
    }
      }
      };
      if (docs.length > 0) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ message: "No entries found" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

//  get all the places where the battle has taken place.
router.get("/list", (req, res, next) => {
  Battles.find()
    .select()
    .exec()
    .then(docs => {
      let location = [];
      const response = {
        count: docs.length,
        locationList: docs.map(doc => {
          return doc.location;
        })
      };
      if (docs.length > 0) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ message: "No entries found" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

//  get the total number of battles occurred
router.get("/count", (req, res, next) => {
  Battles.find()
    .select()
    .exec()
    .then(docs => {
      
      const response = {
        count: docs.length,
        totalBattles: docs.reduce(function (acc, obj) { return acc + obj.battle_number }, 0)
      };
      if (docs.length > 0) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ message: "No entries found" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

//  search api for 
router.get("/search", (req, res, next) => {
  var q = {}; // declare the query object
  q['$and']=[]; // filter the search by any criteria given by the user
  if(req.query.king){ // if the criteria has a value or values
    const queryKing = decodeURI(req.query.king);
    q["$and"].push({ "$or": [{ 'attacker_king': queryKing }, { 'defender_king': queryKing }] }); // add to the query object
  }
  if(req.query.location){
    q["$and"].push({ "location": decodeURI(req.query.location) });
  }
  if(req.query.type){
    q["$and"].push({ "battle_type": decodeURI(req.query.type) });
  } else {
    q["$and"].push({});
  }

  Battles.find(q)
    .select()
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        list: docs
      };
      if (docs.length > 0) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ message: "No entries found" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
