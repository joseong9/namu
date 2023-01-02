const express = require("express");
const router = express.Router();

const mysql = require("mysql");
const path = require("path");

let conn = mysql.createConnection({
    host : "127.0.0.1",
    user : "root",
    password : "1234",
    port : "3306",
    database : "board"
});


router.get('/joinData', (req, res) => {
    let sql = 'INSERT INTO board.TB_BOARD (BOARD_WRITER, BOARD_TITLE, BOARD_CONTENT, INS_DATE) VALUES (?, ?, ?, NOW())';
    conn.query(sql, [req.body.user.BOARD_WRITER, req.body.user.BOARD_TITLE, req.body.user.BOARD_CONTENT], (err, rows)=> {
        if(rows){
            console.log('성공')
            res.json({
                result : 'success'
            })
        } else {
            console.log('실패')
            res.json({
                result : 'fale'
            })
        }
        res.end()
    })
});

router.get('*', (req,res)=> {
    console.log('happy hacking')
    res.sendFile(path.join(__dirname, '..', 'react_project', 'build', 'index.html'));
});

module.exports = router;