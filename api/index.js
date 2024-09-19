const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const app = express();

app.use(cors());
app.use(express.json());

const dataBase = mongoose.connect('mongodb+srv://blog:8QNdKVWchq3avphC@cluster0.odzhw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

app.post('/register', async (req, res) => {
    const {username, password} = req.body;
    const userDoc = await User.create({
        username,
        password
    });
    res.json(userDoc);
});

app.listen(4000);