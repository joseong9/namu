const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const PORT = process.env.port || 8000;

const db = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    passwoard: '1234',
    database: 'simpleboard'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/get', (req, res) => {
    console.log('출력')
    const sqlQurey = "SELECT * FROM simpleboard.board;";
    conn.query(sqlQurey, (err, result) => {
        res.send(result);
        console.log(result)
    })
})

app.post('/api/insert', (req, res) => {
    const BOARD_TITLE = req.body.title;
    const BOARD_COMMENT = req.body.content;
    const sqlQuery = 'INSERT INTO simpleboard.BOARD (BOARD_TITLE, BOARD_COMMENT) VALUES(?, ?);';
    db.query(sqlQuery, [BOARD_TITLE, BOARD_COMMENT], (err, result)=>{
        res.send('success!')
    });
})

app.listen(PORT, ()=>{
    console.log(`running on port ${PORT}`);
});