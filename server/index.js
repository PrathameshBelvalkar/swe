const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "reactbanner",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database");
});

const upload = multer();

app.get("/api/banners", (req, res) => {
  const sqlQuery = "SELECT * FROM reactbannertable";

  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).send("Server Error");
    }

    res.json(results);
  });
});

app.post("/api/addBanner", upload.none(), (req, res) => {
  const {
    banner_name,
    banner_link,
    banner_timer,
    banner_desc,
    banner_visibilty,
  } = req.body;
  const sqlInsert = `INSERT INTO reactbannertable (banner_name, banner_link, banner_timer, banner_desc, banner_visibilty) VALUES (?, ?, ?, ?, ?)`;

  db.query(
    sqlInsert,
    [banner_name, banner_link, banner_timer, banner_desc, banner_visibilty],
    (err, results) => {
      if (err) {
        console.error("Error inserting data:", err);
        return res.status(500).send("Server Error");
      }

      res.status(201).send("Banner inserted successfully");
    }
  );
});

app.put("/api/updateBannerVisibility/:id", (req, res) => {
  const bannerId = req.params.id;
  const { banner_visibilty } = req.body;
  const sqlUpdate = `UPDATE reactbannertable SET banner_visibilty = ? WHERE id = ?`;

  db.query(sqlUpdate, [banner_visibilty, bannerId], (err, results) => {
    if (err) {
      console.error("Error updating data:", err);
      return res.status(500).send("Server Error");
    }

    if (results.affectedRows === 0) {
      return res.status(404).send("Banner not found");
    }

    res.send("Banner visibility updated successfully");
  });
});

app.listen(3400, function () {
  console.log(`Server is listening on port 3400`);
});

module.exports = app;
