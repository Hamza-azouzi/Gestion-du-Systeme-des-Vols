const { query } = require("express");
const { connection } = require("../connection");
const fs = require("fs");
const ejs = require("ejs");

exports.getVols = (req, res) => {
  var sql = `SELECT * FROM vol WHERE date_D= '${req.body.date}' and ville_D = '${req.body.vile_D}' AND ville_A='${req.body.vile_A}' AND nombre_place>=${req.body.nombre_place} `;

  console.log(sql);

  connection.query(sql, function (err, result) {
    if (err) {
      throw err;
    } else {
      var vols = result;

      //  var extras = result;
      res.render("vols", { vols: vols });

      //  req.app.locals.data.nompbreplace=req.body.nombre_p;
    }
  });
};
