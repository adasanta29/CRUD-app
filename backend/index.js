import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"hookmono29",
    database:"test"
})

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json("hello this is the backend")
})

app.get("/comics", (req, res) => {
    const q = "SELECT * FROM comics"
    db.query(q, (err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/comics", (req, res) => {
    const q = "INSERT INTO comics (`title`, `desc`, `price`, `cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.delete('/comics/:id', (req, res) => {
    const comicId = req.params.id;
    const q = "DELETE FROM comics WHERE id = ?"

    db.query(q, [comicId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Comic has successfully been deleted");
    });
});

app.put('/comics/:id', (req, res) => {
    const comicId = req.params.id;
    const q = "UPDATE comics SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]

    db.query(q, [...values, comicId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Comic has successfully been updated");
    })
})

app.listen(8800, () => {
    console.log("Connected to backend!")
})