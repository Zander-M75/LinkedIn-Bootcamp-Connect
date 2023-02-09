const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost/name-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Define the Name model
const Name = mongoose.model("Name", {
    fullName: String
});

// Render the form
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

// Handle form submissions
app.post("/names", (req, res) => {
    const name = new Name({
        fullName: req.body.fullName
    });
    name
        .save()
        .then(() => {
            res.redirect("/");
        })
        .catch(error => {
            console.log(error);
        });
});

// Start the server
app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
});


