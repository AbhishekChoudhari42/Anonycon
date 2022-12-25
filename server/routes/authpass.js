const router = require("express").Router();
const passport = require("passport");
router.get('auth/google/callback',
    passport.authenticate('google',{
        successRedirect:process.env.CLIENT_URL,
        failureRedirect:"/login/failed"
    }))
    router.get("/login/failed",(req, res)=>{
        res.status(401).json({
            error:true,
            message:"login failed"
        })
    })
    router.get("login/success",(req,res)=>{
        if(req.user){
            res.status(200).json({
                error:false,
                message:"login successfull",
                user : req.user
            })
        }else{
            res.status(403).json({
                error:true,
                message:"Not Authorized"
            })
        }
    })

    router.get( 
        "/auth/google/",
        passport.authenticate("google", { scope: ["profile","email"] })
      );

    router.get("/logout", (req, res) => {
        req.logout(req.user, (err) => {
          if (err) return next(err);
          res.redirect("/");
        });
      });

module.exports = router