const express = require('express');
const router = express.Router();
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRATE = 'hello@adityabhai';
const fetchuser = require('../middleware/fetchuser')

// Route 1: Create a user using post localhost:5000/api/auth/createUser
router.post('/createUser',[body('email','give correct email').isEmail(),body('password').isLength({ min: 3 }),body('name','name must be atleast 6 letters').isLength({ min: 2 })],
async (req,res)=>{
    // If there are error the request the bad error and the error
    const result = validationResult(req);
    let success=false;
    if (!result.isEmpty()) {
      success=false;
    res.send({success, errors: result.array() });
    }
    try{
    // Check weather the user with the same email exist already
    let user = await User.findOne({email:req.body.email})
    if(user){
        return res.status(400).json({error:"The user with this email already exists"})
    }
    // Create new User
    const salt = await bcrypt.genSalt(10)
    const safepass = await bcrypt.hash(req.body.password,salt)
    user = await User.create({
        name:req.body.name,
        email:req.body.email,
        password:safepass
    });
    const data = {
        user:{
            id:user.id
        }
    }
    const authtoken = jwt.sign(data,JWT_SECRATE)
    success=true;
    res.json({success,authtoken})
}
catch(error){
    console.error(error.message)
    res.status(500).send("Some error occured")
}
})
// Route 2: Getting user loged in localhost:5000/api/auth/LoginUser
router.post('/LoginUser',[
    body('email','give correct email').isEmail(),
    body('password').isLength({ min: 3 })],
async (req,res)=>{
  let success = false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
    res.send({ errors: result.array() });
    }
    try {
        const {email,password} = req.body;
        let user = await User.findOne({email});
        if(!user){
          success=false;
        return res.status(400).json({success,error:"Email or password is wrong"})
        }
        const passcomp = await bcrypt.compare(password,user.password)
            if(!passcomp)
        {
            return res.status(400).json({error:"Email or password is wrong"})
        }
        else{
            const data = {
                user:{
                    id:user.id
                }
            }
            const authtoken = jwt.sign(data,JWT_SECRATE)
            success = true
            res.json({success,authtoken})
        }
    } 
    catch (error) {
        res.status(400).send("Internal server error")
    }
    
})

router.post('/getuser',fetchuser,async(req,res,next)=>{
    try {
        userid=req.user.id;
        const user = await User.findById(userid).select("-password")
        res.send(user)
    } catch (error) {
        res.status(500).send('Interanl server error')
    }
})

module.exports = router