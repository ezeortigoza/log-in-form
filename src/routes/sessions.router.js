import { Router } from "express";
import usersService from "../models/user.js";
import { createHash } from "../utils.js";
const router = Router();

router.post('/register',async(req,res)=>{
    const {name,email,password} = req.body;
    if(!name||!email||!password) return res.status(400).send({status:"error",error:"Incomplete values"});
    //¿El usuario ya esta en la base de datos?
    const exists = await usersService.findOne({email:email});
    if(exists) return res.status(400).send({status:"error",error:"User already exists"});
    //Insertamos en la base
    const newUser = {
        name,
        email,
        password:createHash(password)
    }
    let result = await usersService.create(newUser);
    res.send(result);
})
export default router;