
const express = require("express");
const app = express();
const { connection } = require("./connection");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
app.locals.data = {
  nombrePlace: "",
  idVol: "",
  prix: "",
  extrs: [],
};
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
const query = require("./controllers/query");

app.get("/", (req, res) => {
  res.render("dash");
});
app.get("/reservation/:id", (req, res) => {
  var sql = `SELECT * FROM vol WHERE id_vol=${req.params.id}`;

  console.log(sql);

  connection.query(sql, function (err, result) {
    if (err) {
      throw err;
    } else {
      var vol = result[0];
      console.log(vol);

      //  var extras = result;
      res.render("reservation", { vol: vol });

      //  req.app.locals.data.nompbreplace=req.body.nombre_p;
    }
  });
});

app.post("/reservation", async (req, res) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    service: "gmail",
    auth: {
      user: "checker.safiairline@gmail.com", // generated ethereal user
      pass: "SafiAIrline@123", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Safii AIrline 👻" <SA@supportexample.com>', // sender address
    to: req.body.email, // list of receivers
    subject: "reservation ",
    text: "reservation done happy flighing", // plain text body
    html: "reservation done happy flighin", // html body
  });

  console.log(req.body);
  res.redirect("/");
});

// app.get('/vols',(req,res)=>{
//   res.render("vols",query.getVols)
// })

app.post("/vols", query.getVols);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
