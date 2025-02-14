const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const User = require('./models/User');
const { measureMemory } = require('vm');
const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = 'dm1893m89qjdasuijd189dj17dhaskjdh189'

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb+srv://blog:8QNdKVWchq3avphC@cluster0.odzhw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {

        if(!token){
            return res.status(401).json({ error: "User not authenticated"})
        }

        if (err) {
            return res.status(401).json({ error: "Invalid or expired token" });
        }
        res.json(info);
    });
});

app.post('/register', async (req, res) => {
    const {username, password} = req.body;
    try{
        const userDoc = await User.create({
            username,
            password:bcrypt.hashSync(password,salt),
        });
        res.json(userDoc);
    } catch (e){
        console.log(e)
        res.status(400).json(e)
    }
});

app.post('/login', async (req, res) => {
    const {username, password} = req.body;

    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);

    if(passOk){
    // logged in
        jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) =>{
            if(err) throw err;
            res.cookie('token', token).json({
                id:userDoc._id,
                username
            });
        });
    } else{
        res.status(400).json('wrong credentials');
    }
});

app.post('/logout', (req, res) => {
    res.clearCookie('token', {httpOnly: true, sameSite: 'Strict'});
    res.status(200).json({ message: 'Logout completed successfully'});
});

app.delete('/users', async (req, res) => {
    const { id } = req.body;

    try {
        const objectId = new mongoose.Types.ObjectId(id);

        const userToDelete = await User.findById(objectId);

    if(userToDelete){
        await User.findByIdAndDelete(objectId);
        return res.json({ message: 'Ok, deleting user', id });
    } else {
        return res.status(404).json({ error: 'User not found' });
    }
} catch(error) {
    return res.status(500).json({ error: 'Internal server error' });
}

});

app.listen(4000);