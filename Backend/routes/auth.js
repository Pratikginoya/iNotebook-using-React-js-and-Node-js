const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
// const formatResponse = require('../helpers/responseFormatter');

const JWT_SECRETS = "HelloIamPratik$"

// ROUTE 1: create new user using: POST "/api/auth/createNewUser". Login not required
router.post('/createNewUser', [
    body('name', 'Name is required').notEmpty(),
    body('name', 'Name should be min 3 characters').isLength({ min: 3 }),
    body('email', 'Email is required').notEmpty(),
    body('email', 'It should be valid email').isEmail(),
    body('password', 'Password is required').notEmpty(),
    body('password', 'Password should be min 5 characters').isLength({ min: 5 }),
], async (req,res)=>{
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({ success, data: errorMessages });
    }

    try{
        // const user = User(req.body);
        // user.save();
        // res.send(req.body);
    
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({ success, "data":"Email already exist in another user" });
        }
    
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        // .then(user => res.json(user));
    
        const userData = {
            user: {
                id: user.id
            }
        }
        const data = jwt.sign(userData, JWT_SECRETS);
        success = true;
        res.json({success, data});
    }catch(error){
        success = false;
        console.error(error.message);
        res.status(500).send({success, "data":"Internal server error!"});
    }
});


// ROUTE 2: login user using: POST "/api/auth/login". Login not required
router.post('/login', [
    body('email', 'Email is required').notEmpty(),
    body('email', 'It should be valid email').isEmail(),
    body('password', 'Password is required').notEmpty()
], async (req,res)=>{
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({ success, data: errorMessages });
    }

    const {email, password} = req.body;
    try{
        let user = await User.findOne({email:email});
        if(!user){
            return res.status(400).json({ success, "data":"Invalid credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({ success, "data":"Invalid credentials" }); 
        }

        const userData = {
            user: {
                id: user.id
            }
        }
        const data = jwt.sign(userData, JWT_SECRETS);
        success=true;
        res.json({success, data});
    }catch(error){
        success=false;
        console.log(error.message);
        res.status(500).send({ success, "data":"Internal server error!" });
    }
});

// ROUTE 3: get user data using: POST "/api/auth/getUser". Login required
router.post('/getUser', fetchuser, async (req,res)=>{
    let success=false;
    try{
        const userId = req.user.id;
        const data = await User.findById(userId).select("-password");
        success=true;
        res.json({success, data});
        // res.json({success, data: [user]});
    }catch(error){
        success=false;
        console.log(error.message);
        res.status(500).send({ success, "data":"Internal server error!" });
    }
});

module.exports = router