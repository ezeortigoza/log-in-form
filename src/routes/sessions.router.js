import { Router } from "express";
import usersService from "../models/user.js";
import { createHash } from "../utils.js";
import passport from 'passport';
const router = Router();

router.post('/register', passport.authenticate('register',{failureRedirect: 'api/sessions/registerFail'}),async(req,res)=>{
  console.log(req.user);
  res.send({status:"success",payload:req.user._id});
})
router.get('/registerFail',(req,res)=>{
  console.log("something is wrong");
  res.status(500).send({status:"error",error:""})
})

router.post("/loger", passport.authenticate('login',{failureRedirect:'/api/sessions/loginfail'}) ,async (req, res) => {

    req.session.user = {
      // Create in the session cookie a user (this one must not carry important information)
      name:req.user.name,
      email:req.user.email,
      password:req.user.password,
      id:req.user._id,
      role: "user",
    };
    res.send({
      status: "success",
      message: `Welcome ${req.user.email}, you are now logged in.`,
    });
  });
  
  router.get("/current", (req, res) => {
    if (!req.session.user) {
      // If the user exists, is because it already has gone through login process:
      return res.status(400).send({
        status: "error",
        message: "No current active sessions, please log in",
      });
    }
    res.send({
      status: "success",
      message: `Welcome user ${req.session.user.email}, you still have an ongoing session`,
    });
  });
  
  router.get("/logout", (req, res) => {
    req.session.destroy((error) => {
      if (error)
        return res.status(500).send({
          status: "error",
          message: "Could not logout, please try again",
        });
    });
    res.send({ status: "success", message: "Logged out!" });
  });

  router.get('/github',passport.authenticate('github',{scope:[]}),async(req,res)=>{
    //Este punto de aqui se encarga de abrir la aplicacion en el navegador
  })

  router.get('/githubcallback',passport.authenticate('github'),(req,res)=>{
    req.session.user = {
      name:req.user.name,
      email:req.user.email,
      id:req.user._id
    }
    res.redirect('/current');
  })
  
export default router;