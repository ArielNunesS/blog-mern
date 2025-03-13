const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const User = require('./models/User');
const Post = require('./models/Post');
const multer = require('multer');
const uploadMiddleware = multer({ dest: process.env.UPLOAD_DIR || 'uploads/' });
const fs = require('fs');
const app = express();

require('dotenv').config();

const salt = bcrypt.genSaltSync(10);
const secret = process.env.JWT_SECRET || 'dm1893m89qjdasuijd189dj17dhaskjdh189';
const allowedOrigins = [
    'https://blog-mern-frontend-beta.vercel.app',
    'http://localhost:3000'
];

const API_KEY = process.env.API_KEY;

const checkApiKey = (req, res, next) => {
    const apiKey = process.env.API_KEY;

    

    if(!apiKey) {
        return res.status(403).json({ error: 'Access denied: Invalid api key'});
    }

    if (apiKey !== API_KEY) {
        return res.status(403).json({ error: 'Invalid API Key' });
    }

    next();
}

app.use(cors({
    credentials:true,
    origin: function(origin, callback) {
        if(!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect(process.env.MONGODB_URI);

app.get('/users', checkApiKey, async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.get('/profile', checkApiKey, (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err
        res.json(info);
    });
});

app.post('/register', checkApiKey, async (req, res) => {
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

app.post('/login', checkApiKey, async (req, res) => {
    const {username, password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);

    if(passOk){
    // logged in
        jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) =>{
            if(err) throw err;
            res.cookie('token', token).json({
                id:userDoc._id,
                username,
            });
        });
    } else{
        res.status(400).json('wrong credentials');
    }
});

app.post('/logout', checkApiKey, (req, res) => {
    res.clearCookie('token', {httpOnly: true, sameSite: 'Strict'});
    res.status(200).json({ message: 'Logout completed successfully'});
});

app.post('/posts', checkApiKey, uploadMiddleware.single('file'), async (req, res) => {
    const {originalname, path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const {title, summary, content} = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author:info.id,
        });
            res.json({postDoc});
    });
});

app.delete('/users/:id', checkApiKey, async (req, res) => {
    const { id } = req.params;

    try {
        const objectId = new mongoose.Types.ObjectId(id);
        const userToDelete = await User.findById(objectId);

    if(userToDelete){
        const username = userToDelete.username;
        await User.findByIdAndDelete(objectId);
        return res.json({ message: 'Ok, deleting user', username });
    } else {
        return res.status(404).json({ error: 'User not found' });
    }
} catch(error) {
    return res.status(500).json({ error: 'Internal server error' });
}

});

app.get('/posts', async (req, res) => {
    try {
        res.json(await Post.find()
        .populate('author', ['username'])
        .sort({createdAt: -1})
        .limit(20)
    )} catch(error){
        res.status(500).json({ error: 'Internal server error'});
    }
});

app.get('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username']);
    res.json(postDoc);
});

app.delete('/posts/:id', checkApiKey, async (req, res) => {
    const { id } = req.params;

    try {
        const postToDelete = await Post.findById(id);

    if(postToDelete) {
        await Post.findByIdAndDelete(postToDelete);
        return res.status(200).json({ message: "Ok, deleting post", id });
    } else {
        return res.status(404).json({ error: "Post not found" });
    }
}   catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }

});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});