import { Router } from "express";
import usersService from "../models/user.js";
import session from 'express-session';
import Mongostore from 'connect-mongo';

const router = Router();


router.get('/', (req,res)=>{
    res.render('register');
})
/* router.get('/welcome',async(req,res)=>{
    let newUser = await usersService.findById("6320a4553e1a70ea625d6cf7")
//   res.render('welcome',{
        newUser,
    })
}) */

router.use(session({
    store:Mongostore.create({
        mongoUrl:'mongodb+srv://MONGODB:123@mongodb.mgpqn0y.mongodb.net/mongosh?retryWrites=true&w=majority',
        ttl:25
    }),
    secret:"Ezeee :)",
    resave:false,
    saveUninitialized:false
}))
router.get('/loginn',(req,res)=>{
    const name = "carlos";
    const password = "123";
    const email = "carlos@gmail.com";
    req.session.user ={
        name,
        password,
        email
    }
    res.send(`Logueado :) ${name} !!`);
})
 router.get('/visited',(req,res)=>{
    if(req.session.counter){
        res.send(`Visitado ${++req.session.counter} veces`);
    }else{
        req.session.counter=1;
        res.send("Bienvenido");
    }
})

router.get('/loger',(req,res)=>{
    const email = req.body.email
    const name = req.body.name
    const password = req.body.password
    req.session.user ={
        email,
        name,
        password,
    }
    
    res.render('login');
}) 

export default router;