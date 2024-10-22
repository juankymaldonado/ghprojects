import express from "express";
import { MongoClient } from "mongodb";
import fs from "fs";
import admin from "firebase-admin";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import mg from "nodemailer-mailgun-transport";

/************** Application Backend ***********************/
// API to GET/POST data into mongo database
// Send an email using MailGun library

dotenv.config();

const credentials = JSON.parse(fs.readFileSync("./credentials.json"));
admin.initializeApp({
  credentials: admin.credential.cert(credentials),
});

const app = express();
app.use(express.json());

//Get skills from db
app.get("/api/skills", async (req, res) => {
  const client = new MongoClient("mongodb://127.0.0.1:27017");

  try {
    await client.connect();
    const db = client.db("coverletter-db");

    // Fetch all documents from the 'skills' collection
    const messages = await db.collection("skills").find().toArray();

    res.json(messages);
  } catch (error) {
    console.error("Error fetching skills:", error);
    res.status(500).send("An error occurred while fetching skills.");
  }
});

//Add new skill
app.post("/api/addskill", async (req, res) => {
  const { name } = req.body;

  const client = new MongoClient("mongodb://127.0.0.1:27017");
  try {
    await client.connect();
    const db = client.db("coverletter-db");

    const newskill = { name: name };

    //Add a new skill to db
    db.collection("skills").insertOne(newskill);

    res.status(200).send("Skill succesfully added.");
  } catch (error) {
    console.error("Error adding skills:", error);
    res.status(500).send("An error occurred while adding skills.");
  }
});

//Get expreciences from db
app.get("/api/experiences", async (req, res) => {
  const client = new MongoClient("mongodb://127.0.0.1:27017");
  try {
    await client.connect();
    const db = client.db("coverletter-db");

    // Fetch all documents from the 'experiences' collection
    const messages = await db.collection("experiences").find().toArray();

    res.json(messages);
  } catch (error) {
    console.error("Error fetching experiences:", error);
    res.status(500).send("An error occurred while fetching experiences.");
  }
});

//Add a new experience
app.post("/api/addexperience", async (req, res) => {
  const { name, desc, type, date } = req.body;

  const client = new MongoClient("mongodb://127.0.0.1:27017");
  try {
    await client.connect();
    const db = client.db("coverletter-db");

    const newexperience = {
      name: name,
      description: desc,
      type: type,
      date: date,
    };

    //Add a new experience to dbdb
    db.collection("experiences").insertOne(newexperience);

    res.status(200).send("Experience succesfully added.");
  } catch (error) {
    console.error("Error adding experiences:", error);
    res.status(500).send("An error occurred while adding experiences.");
  }
});

//Get highlights from db
app.get("/api/highlights", async (req, res) => {
  const client = new MongoClient("mongodb://127.0.0.1:27017");
  try {
    await client.connect();
    const db = client.db("coverletter-db");

    // Fetch all documents from the 'highlights' collection
    const messages = await db.collection("highlights").find().toArray();

    res.json(messages);
  } catch (error) {
    console.error("Error fetching highlights:", error);
    res.status(500).send("An error occurred while fetching highlights.");
  }
});

//Add new highlight
app.post("/api/addhighlight", async (req, res) => {
  const { title, desc } = req.body;

  const client = new MongoClient("mongodb://127.0.0.1:27017");
  try {
    await client.connect();
    const db = client.db("coverletter-db");

    const newhighlight = { title: title, description: desc };

    //Add a new highlight to db
    db.collection("highlights").insertOne(newhighlight);

    res.status(200).send("Highlight succesfully added.");
  } catch (error) {
    console.error("Error adding highlights:", error);
    res.status(500).send("An error occurred while adding highlights.");
  }
});

//Get abouts from db
app.get("/api/about", async (req, res) => {
  const client = new MongoClient("mongodb://127.0.0.1:27017");
  try {
    await client.connect();
    const db = client.db("coverletter-db");

    // Fetch all documents from the 'abouts' collection
    const messages = await db.collection("about").find().toArray();

    res.json(messages);
  } catch (error) {
    console.error("Error fetching abouts:", error);
    res.status(500).send("An error occurred while fetching abouts.");
  }
});

//Add new about
app.post("/api/addabout", async (req, res) => {
  const { desc } = req.body;

  const client = new MongoClient("mongodb://127.0.0.1:27017");
  try {
    await client.connect();
    const db = client.db("coverletter-db");

    const newabout = { description: desc };

    //Add a new about to db
    db.collection("about").insertOne(newabout);

    res.status(200).send("About succesfully added.");
  } catch (error) {
    console.error("Error adding abouts:", error);
    res.status(500).send("An error occurred while adding abouts.");
  }
});

//Get message sent by page guest
app.get("/api/messages", async (req, res) => {
  const client = new MongoClient("mongodb://127.0.0.1:27017");
  try {
    await client.connect();
    const db = client.db("coverletter-db");

    // Fetch all documents from the 'messages' collection
    const messages = await db.collection("messages").find().toArray();

    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("An error occurred while fetching messages.");
  }
});

//Add a new message sent by page guest
app.post("/api/addmessages", async (req, res) => {
  const { name, message } = req.body;

  const client = new MongoClient("mongodb://127.0.0.1:27017");
  try {
    await client.connect();
    const db = client.db("coverletter-db");

    const newmessage = { name: name, message: message };

    //Add a new message to db
    db.collection("messages").insertOne(newmessage);

    //Here we send the email

    const auth = {
      auth: {
        api_key: process.env.MAILGUN_KEY, // Your Mailgun API key
        domain: process.env.MAIL_DOMAIN, // Your Mailgun domain
      },
    };

    const transporter = nodemailer.createTransport(mg(auth));

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `${name} send you a message!`,
      text: `${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send("Message succesfully sent.");
  } catch (error) {
    console.error("Error sending messages:", error);
    res.status(500).send("An error occurred while sending messages.");
  }
});

app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
