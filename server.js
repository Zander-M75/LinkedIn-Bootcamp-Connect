const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/linkedin-bootcamp-connect', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define the User schema
const userSchema = new mongoose.Schema({
    fullName: String,
    linkedinLink: String,
});

const User = mongoose.model('User', userSchema);

// Route to add a new user
app.post('/users', async (req, res) => {
    const user = new User({
        fullName: req.body.fullName,
        linkedinLink: req.body.linkedinLink,
    });

    try {
        await user.save();
        res.status(201).send();
    } catch (error) {
        res.status(400).send(error);
    }
});

// Route to remove a user
app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error);
    }
});

// Route to fetch the list of users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});




