import { Router } from "express";
import usersService from "../models/user.js";
import session from 'express-session';
import Mongostore from 'connect-mongo';
import passport from "passport";

const router = Router();


/* router.get('/welcome',async(req,res)=>{
    let newUser = await usersService.findById("6320a4553e1a70ea625d6cf7")
//   res.render('welcome',{
        newUser,
    })
}) */

router.get('/register',(req,res)=>{
    res.render('register')
})

router.use(session({
    store:Mongostore.create({
        mongoUrl:'mongodb+srv://MONGODB:123@mongodb.mgpqn0y.mongodb.net/mongosh?retryWrites=true&w=majority',
        ttl:25
    }),
    secret:"Ezeee :)",
    resave:false,
    saveUninitialized:false
}))
/* router.get('/loginn',(req,res)=>{
    const name = "carlos";
    const password = "123";
    const email = "carlos@gmail.com";
    req.session.user ={
        name,
        password,
        email
    }
    res.send(`Logueado :) ${name} !!`);
}) */
 router.get('/visited',(req,res)=>{
    if(req.session.counter){
        res.send(`Visitado ${++req.session.counter} veces`);
    }else{
        req.session.counter=1;
        res.send("Bienvenido");
    }
})

router.get('/loger',(req,res)=>{
    res.render('login');
}) 
 router.get('/current',(req,res)=>{
     if(!req.session.user) return res.redirect('/loger')
    res.render('current',{user:req.session.user})
}) 

export default router;