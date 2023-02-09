const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/name-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const nameSchema = new mongoose.Schema({
    fullName: String
});

const Name = mongoose.model('Name', nameSchema);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/names', (req, res) => {
    const fullName = req.body.fullName;
    if (fullName.split(" ").length !== 2) {
        res.status(400).send('Please enter a valid full name, with only one space between the first and last name.');
        return;
    }

    const name = new Name({
        fullName: fullName
    });

    name.save((error) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send('Name saved successfully');
        }
    });
});

app.listen(3000, () => {
    console.log('Name app listening on port 3000!');
});

