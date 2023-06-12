/*
 *  Simple Trakstr API:
 *    - Connects to database
 *    - Route for all merchants
 *    - Route for single merchant
 */

const express = require("express")
const { getDb, connectToDb } = require("./db")
const { ObjectId } = require("mongodb")
require("dotenv").config()
const cors = require("cors")

// init app & middleware
const app = express()
app.use(express.json())
app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.0.51:3000"],
  })
)

// db connection
let db
connectToDb((err) => {
  if (!err) {
    db = getDb();
    app.listen(process.env.PORT, () => {
      console.log(`app listening on port ${process.env.PORT}`)
    })
  }
})


// Routes

// Retrieve all merchants
app.get("/united", (req, res) => {

  let merchs = []

  db.collection("united")
    .find()
    .sort({ merchName: 1 })
    .forEach((merch) => merchs.push(merch))
    .then(() => {
      res.status(200).json(merchs)
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the documents" })
    })
})

// Retrieve single merchant
app.get("/united/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("united")
      .findOne({ _id: new ObjectId(req.params.id) })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not fetch the document" })
      })
  } else {
    res.status(500).json({ error: "Could not fetch the document" })
  }
})
