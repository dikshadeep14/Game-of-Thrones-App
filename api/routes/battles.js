const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// const multer = require("multer");

const Battles = require("../models/battle");

router.get("/", (req, res, next) => {
  Battles.find()
    .select("name year _id battle_number")
    .exec()
    .then(docs => {
      console.log('docs..', docs)

      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            name: doc.name,
            year: doc.year,
            battle_number: doc.battle_number,
            _id: doc._id,
            request: {
              type: "GET",
              url: `http://localhost:3002/list`
            }
          };
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

module.exports = router;
