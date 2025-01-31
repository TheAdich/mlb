const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const cors = require('cors');
const  User  = require('./models/userModel');
const app = express();
dotenv.config();
app.use(cors(
    {
        origin: ['http://localhost:3000','https://mlb-gamma.vercel.app'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    
}).then(() => {
    console.log('Connected to MongoDB');
})
    .catch(err => {
        console.error(err);
    })

app.post('/api/register', async (req, res) => {
    const formData = req.body;
    console.log(formData)
    try {
        const isUserExist = await User.findOne({ username: formData.username });
        if (isUserExist) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(formData.password, 10);
        const newUser = new User({
            username: formData.username,
            email: formData.email,
            password: hashedPassword,
            premium: formData.premium
        });
        await newUser.save();
        return res.status(200).json({
            username: newUser.username,
            email: newUser.email,
        });

    } catch (err) {
        console.error(err);
    }


})

app.post('/api/login', async (req, res) => {
    const formData = req.body;
    try {
        const user = await User.findOne({ username: formData.username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isPasswordValid = await bcrypt.compare(formData.password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        return res.status(200).json({
            username: user.username,
            email: user.email,
        });
    } catch (err) {
        console.error(err);
    }
})

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})

