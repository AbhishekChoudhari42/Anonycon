const router = require("express").Router();
const mongoose = require('mongoose')
const User = require("../models/User");
const checkSentiment = require("../functions/sentiment");

// user email to response
router.get("/getuser/:email",async (req, res)=>{
  let emailReq = req.params.email;
    const user = await User.find({email:emailReq});

    if(user[0]){
      return res.json({username:user[0].username})
    }
})

router.post("/validateuser",async (req, res)=>{
    try{
    let emailReq = req.body.email;
    const user = await User.find({email:emailReq});
    if(user[0]){
      return res.json({username:user[0].username})

    }else{
      const newUser = new User({
        username:req.body.username , email:req.body.email
      });
      const savedUser = await newUser.save();
      return res.json({username:req.body.username})

    }}catch(err){
      res.json({username:'error'})
    }
  })




// get messages 
  router.get("/getmessage/:user", async (req, res) => {
    
    try {
      const user = await User.find({username : req.params.user});

      res.status(200).json(user[0].message);

    } catch (err) {
      res.status(500).json(err);
    }
  });


  //  validate message

  const validateMessage = (msg) => {
    return checkSentiment(msg)
  }

  // send messages

  router.put("/sendmessage/:user", async (req, res) => {
      //params for receiver

      const receiver = req.params.user;

      // body for sender
      // const sender = req.body.username;  
      const message = req.body.message; 
      const msgData = validateMessage(message)
      
      if(msgData.valid){
        
        try {

          const userReceiver = await User.find({username : receiver});
          // const userSender = await User.find({username : sender});
          let time = new Date().getTime();
          
          await userReceiver[0].updateOne({
            $push : {
              message:JSON.stringify(
                {
                  msg_txt:message,
                  score:msgData.score,
                  time:time
        })}})
            
          res.status(200).json(userReceiver[0].message);

         
         
        
        } catch (err) {
          
          res.status(500).json({message:"Something went wrong"});
        
        }        
      }else{
        res.status(500).json({message:"message sending failed please dont use foul language"})
      }
  
  });



  module.exports = router;