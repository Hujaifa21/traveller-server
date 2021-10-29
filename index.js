const express = require("express");
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const ObjectId = require("mongodb").ObjectId;
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello Hujaifa!");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wozmo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const travelCollection = client.db("travel").collection("destination");

  // add destination 
  app.post("/addDestination", async (req, res) => {
    // console.log(req.body);
    const result = await travelCollection.insertOne(req.body);
    res.send(result);
  });

  app.get("/addDestination", async (req, res) => {
    const result = await travelCollection.find({}).toArray();
    res.send(result);
  });
  
  // client.close();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});