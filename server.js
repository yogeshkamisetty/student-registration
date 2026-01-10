const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Yogi@2534",        // if your MySQL has a password, put it here
    database: "studentdb"
});

db.connect(err => {
    if (err) {
        console.log("Database connection failed");
        throw err;
    }
    console.log("MySQL Connected");
});

// STUDENT REGISTER
app.post("/register", (req, res) => {
    const s = req.body;

    const sql = `
    INSERT INTO students
    (roll, firstname, lastname, father_name, dob, mobile, email, gender, department, course, city, address)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    const values = [
        s.roll,
        s.firstname,
        s.lastname,
        s.father_name,
        s.dob,
        s.mobile,
        s.email,
        s.gender,
        Array.isArray(s.department) ? s.department.join(",") : s.department,
        s.course,
        s.city,
        s.address
    ];

    db.query(sql, values, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Database error");
        }
        res.send("Registered");
    });
});

// ADMIN FETCH
app.get("/users", (req, res) => {
    db.query("SELECT * FROM students", (err, result) => {
        if (err) return res.status(500).send("DB Error");
        res.json(result);
    });
});

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM students WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("DB Error");
        }
        if (result.affectedRows === 0) {
            return res.status(404).send("No such student");
        }
        res.send("Deleted");
    });
});


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

