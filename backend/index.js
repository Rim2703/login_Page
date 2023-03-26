const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'nodejs_mysql'
})

con.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
})


const jwtSecret = "secretKey";

app.post("/login", (req, res) => {
  const { name, mobile, email } = req.body;
  const sql = "INSERT INTO persons (name, mobile, email) VALUES (?, ?, ?)";
  con.query(sql, [name, mobile, email], (err, result) => {
    if (err) throw err;
    console.log("User added to database");
    const token = jwt.sign({ email }, jwtSecret, { expiresIn: "1h" });
    console.log(token)
    res.json({ token });
  });
});

app.listen(5000, () => {
    console.log('Server started on port 3000');
});