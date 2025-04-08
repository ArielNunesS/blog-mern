const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const User = require('./models/User');
const Post = require('./models/Post');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const app = express();
require('dotenv').config();

cloudinary.config({
    cloud_name: 'di5ta6sun',
    api_key: '846464382732734',
    api_secret: process.env.API_SECRET,
})

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'blog-uploads',
        allowed_formats: ['jpg', 'png', 'jpeg'],
        public_id: (req, file) => `${Date.now()}-${file.originalname}`,
    },
});

const uploadMiddleware = multer({ storage });

app.use(cors({
    origin: [
        'https://blog-mern-frontend-beta.vercel.app',
        'https://blog-mern-frontend-beta.vercel.app/create',
        'http://localhost:3000',
    ],
    credentials: true
}));

app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URI);

const salt = bcrypt.genSaltSync(10);
const secret = process.env.JWT_SECRET;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Origin', 'https://blog-mern-frontend-beta.vercel.app', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    
    next();
});

app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err
        res.json(info);
    });
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
        jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) =>{
            if(err) throw err;
            res.cookie('token', token, { httpOnly: true, sameSite: 'None', secure: true}).json({
                id:userDoc._id,
                username,
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

app.post('/posts', uploadMiddleware.single('file'), async (req, res) => {
    const { token } = req.cookies;

    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) return res.status(401).json({ error: 'Token inválido' });
    
        const {title, summary, content} = req.body;

        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: req.file.path,
            author: info.id,
        });
            res.json({postDoc});
    });
});

app.delete('/users/:id', async (req, res) => {
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

app.delete('/posts/:id', async (req, res) => {
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