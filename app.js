const express = require('express')
const { getDb, connectToDb } = require('./db')
const { ObjectId } = require('mongodb')
require('dotenv').config()

// init app & middleware
const app = express()
app.use(express.json())

// db connection
let db

connectToDb((err) => {
  if(!err){
    db = getDb()
    app.listen(process.env.PORT, () => {
      console.log(`app listening on port ${process.env.PORT}`)
    })
  }
})

// routes
app.get('/united', (req, res) => {
  // current page
  //const page = req.query.p || 0
  //const merchsPerPage = 2000
  
  let merchs = [  ]

  db.collection('united')
    .find()
    .sort({merchName: 1})
    //.skip(page * merchsPerPage)
    //.limit(merchsPerPage)
    .forEach(merch => merchs.push(merch))
    .then(() => {
      res.status(200).json(merchs)
    })
    .catch(() => {
      res.status(500).json({error: 'Could not fetch the documents'})
    })
})

app.get('/united/:id', (req, res) => {

  if (ObjectId.isValid(req.params.id)) {

    db.collection('united')
      .findOne({_id: new ObjectId(req.params.id)})
      .then(doc => {
        res.status(200).json(doc)
      })
      .catch(err => {
        res.status(500).json({error: 'Could not fetch the document'})
      })
      
  } else {
    res.status(500).json({error: 'Could not fetch the document'})
  }

})

