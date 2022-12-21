const router = require("express").Router();
const mongoose = require('mongoose')
const User = require("../models/User");

// user registration


router.post("/new_user", async (req, res) => {
    const newUser = new User(req.body);
    try {
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
});




//   router.get("/all", async (req, res) => {
    
//     try {
//       const Activities = await Activity.find({});
//       res.status(200).json(Activities);

//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

//   router.get("/getActivity/:id", async (req, res) => {
    
//     try {
//         const id = req.params.id;
//       const Activities = await Activity.findById(id);
//       res.status(200).json(Activities)

//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

// //   findByIdAndUpdate(req.params.id,{$set:req.body})
// router.put("/update/:id", async (req, res) => {
//     const newActivity = new Activity(req.body);
//     try {
//       const activity = await Activity.findByIdAndUpdate(req.params.id,{$set:req.body});
//       res.status(200).json(activity);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
// //   deleteOne

//   router.delete("/delete", async (req, res) => {
//     const newActivity = new Activity(req.body);
//     try {
//       const activity = await Activity.deleteOne({_id : req.body.id});
//       res.status(200).json(activity);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

// router.put("/attendance/:id", async (req, res) => {
//     const newStudent = req.body.student;  
//     try {

//     const activity = await Activity.findById(req.params.id);
//       await activity.updateOne({$push : { registrations:newStudent}})

//       res.status(200).json(activity);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });


  module.exports = router;