const session = require("express-session");
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use(session({
    secret: "student_secret",
    resave: false,
    saveUninitialized: false
}))

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
    if (!s.roll || !s.firstname || !s.lastname || !s.email || !s.gender || !s.course) {
        return res.status(400).send("Missing required fields");
    }

    if (!s.email.includes("@")) {
        return res.status(400).send("Invalid email");
    }

    if (!s.mobile || s.mobile.length < 10) {
        return res.status(400).send("Invalid mobile number");
    }

       db.query("SELECT id FROM students WHERE roll = ?", [s.roll], (err, r1) => {
        if (err) return res.status(500).send("DB Error");
        if (r1.length > 0) return res.status(400).send("Roll already exists");

        // Check duplicate email
        db.query("SELECT id FROM students WHERE email = ?", [s.email], (err, r2) => {
            if (err) return res.status(500).send("DB Error");
            if (r2.length > 0) return res.status(400).send("Email already registered");

            // Insert
            insertStudent(s, res);
        });
    });
});


function insertStudent(s, res) {

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
};

app.post("/admin/login", (req, res) => {
    const { username, password } = req.body;

    db.query(
        "SELECT * FROM admins WHERE username=? AND password=?",
        [username, password],
        (err, result) => {
            if (result.length === 0) {
                return res.status(401).send("Invalid credentials");
            }
            req.session.admin = true;
            res.send("OK");
        }
    );
});

function isAdmin(req, res, next) {
    if (!req.session.admin) {
        return res.status(401).send("Unauthorized - Access denied");
    }
    next();
}

// ADMIN FETCH (protected route)
app.get("/users",isAdmin, (req, res) => {
    db.query("SELECT * FROM students", (err, result) => {
        if (err) return res.status(500).send("DB Error");
        res.json(result);
    });
});

app.delete("/delete/:id",isAdmin, (req, res) => {
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

