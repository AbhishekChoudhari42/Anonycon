const router = require("express").Router();
const mongoose = require('mongoose')
const User = require("../models/User");

const bcrypt = require("bcrypt")


// user login

router.post("/login",async (req,res)=>{
    try{
     const user = await User.findOne({email:req.body.email});
     !user && res.status(404).json("no user found");

     const validPassword = await bcrypt.compare(req.body.password,user.password);

     !validPassword && res.status(400).json("wrong password")

    res.status(200).json({username : user.username})

    }catch(error){
        console.log(error)
    }
})


// user registration


router.post("/registration", async (req, res) => {
   
    const newUser = new User({
      username:req.body.username , email:req.body.email
    });

    try {
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } catch (err) {
      res.status(500).json(
        {
            username:err.keyValue.username ? true : false,
            email:err.keyValue.email ? true : false
        }
        
    
        );
    }
});

module.exports = router