const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Journal collection and inserts the diary entries below

//local database url, 27017 is the default mongoDB port
const uri = process.env.MONGODB_URI || "mongodb://localhost/pjdb";

mongoose.connect(uri, { useCreateIndex: true, useNewUrlParser: true }).then(
  () => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    console.log("Connected to Mongo");
  },
  err => {
    /** handle initial connection error */
    console.log("error connecting to Mongo: ");
    console.log(err);
  }
);

const journalSeed = [
  {
    title: "The Dead Zone",
    date: new Date(Date.now())
  },
  {
    title: "Lord of the Flies",
    date: new Date(Date.now())
  },
  {
    title: "The Catcher in the Rye",
    date: new Date(Date.now())
  },
  {
    title: "The Punch Escrow",
    date: new Date(Date.now())
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    date: new Date(Date.now())
  },
  {
    title: "Coraline",
    date: new Date(Date.now())
  },
  {
    title: "Code: The Hidden Language of Computer Hardware and Software",
    date: new Date(Date.now())
  },
  {
    title: "The Everything Store: Jeff Bezos and the Age of Amazon",
    date: new Date(Date.now())
  },
  {
    title: "Total Recall: My Unbelievably True Life Story",
    date: new Date(Date.now())
  },
  {
    title: "Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future",
    date: new Date(Date.now())
  },
  {
    title: "Steve Jobs",
    date: new Date(Date.now())
  },
  {
    title: "Astrophysics for People in a Hurry",
    date: new Date(Date.now())
  },
  {
    title: "1984",
    date: new Date(Date.now())
  },
  {
    title: "Frankenstein",
    date: new Date(Date.now())
  },
  {
    title: "The Great Gatsby",
    date: new Date(Date.now())
  },
  {
    title: "Born a Crime: Stories from a South African Childhood",
    date: new Date(Date.now())
  }
];

db.Journal.remove({})
  .then(() => db.Journal.collection.insertMany(journalSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
