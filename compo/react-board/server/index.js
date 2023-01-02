const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require('cors');
const PORT = process.env.port || 8000;
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  port: "3306",
  password: "1234",
  database: "bbs",
});

// app.get("/", (req, res) => {
//   const sqlQuery = "INSERT INTO requested (rowno) VALUES (1)";
//   db.query(sqlQuery, (err, result) => {
//     res.send("success!");
//   });
// });

app.get("/list", (req, res) => {
  const sqlQuery = "SELECT BOARD_ID, BOARD_TITLE, REGISTER_ID, DATE_FORMAT(REGISTER_DATE, '%Y-%m-%d') AS REGISTER_DATE FROM BOARD;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

app.post("/insert", (req, res) => {
  var title = req.body.title;
  var content = req.body.content;

  const sqlQuery =
    "INSERT INTO BOARD (BOARD_TITLE, BOARD_CONTENT, REGISTER_ID) VALUES (?,?,artistJay);";
  db.query(sqlQuery, [title, content], (err, result) => {
    res.send(result);
  });
});

app.post("/update", (req, res) => {
  var title = req.body.title;
  var content = req.body.content;

  const sqlQuery =
    "UPDATE BOARD SET BOARD_TITLE = ?, BOARD_CONTENT = ?, UPDATER_ID) FROM (?,?,artistJay);";
  db.query(sqlQuery, [title, content], (err, result) => {
    res.send(result);
  });
});

app.post("/delete", (req, res) => {
  const id = req.body.boardIdList; // 6,5

  const sqlQuery = `DELETE FROM BOARD WHERE BOARD_ID IN (${id})`;
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});