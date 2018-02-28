var express = require("express");

var router = express.Router();
var burger = require("../models/burger.js");

router.get("/", function (req, res) {
  burger.all(function (data) {
    var devoured = [];
    var notDevoured = [];

    var hbsObject = {
      burger: data,
      devoured: [],
      notDevoured: []
    };

    for (var i = 0; i < data.length; i++) {
      if (data[i].devoured) {
        hbsObject.devoured.push(data[i]);
      } else {
        hbsObject.notDevoured.push(data[i]);
      }; 
    };
    res.render("index", hbsObject);
  });
});

router.post("/api/burger", function (req, res) {
  burger.create(
    ["burger_name"], 
    [req.body.newBurger],
  function (result) {
    res.json({
      id: result.insertId
    });
  });
});

router.put("/api/burger/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({
    devoured: req.body.devoured
  }, condition, function (result) {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/burger/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  burger.delete(condition, function (result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;