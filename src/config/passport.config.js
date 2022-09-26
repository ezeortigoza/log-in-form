import passport from "passport";
import local from 'passport-local';
import usersService from '../models/user.js';
import { createHash } from "../utils.js";
import githubStrategy from 'passport-github2';

const localStrategy = local.Strategy;

const initializePassport = () =>{
    passport.use('register',new localStrategy({passReqToCallback:true,usernameField:"email"},
    async(req,email,password,done)=>{
        const {name} = req.body;
        if(!name||!email||!password) return done(null,false,{message:"Incomplete values"})
        //¿El usuario ya esta en la base de datos?
        const exists = await usersService.findOne({email:email});
        if(exists) return done(null,false,{message:"User already exists"})
        //Insertamos en la base
        const newUser = {
            name,
            email,
            password:createHash(password)
        }
        let result = await usersService.create(newUser);
        //SI TODO SALIO BIEN LA ESTRATEGIA
        return done(null,result)
    }

    ))

    passport.use('login',new localStrategy({usernameField:'email'},async(email,password,done)=>{
        if (!email || !password) return done(null,false,{message:"Incomplete values"});
        // Verify if the user exists with that user and pasword in the database:
        const user = await usersService.findOne({ email: email });
        if (!user)
          return done(null,false,{message:"Incorrect credentials"});
        if (user.password === password)
         return done(null,false,{message:"Incorrect password"});
         return done(null,user);
    }))

    passport.use('github',new githubStrategy({
        clientID: 'Iv1.d42ac9bc5196cace',
        clientSecret: '6a281b3b522282f6a229e1e003d6a73aae2d8e11',
        callbackURL:'http://localhost:8080/api/sessions/githubcallback'
    },async(accessToken,refreshToken,profile,done)=>{
        // console.log(profile);
        // return done(null,false);

        //Extraer datos del profile
        const {name,location,email} = profile._json;

        //¿existe en la base?
        let user = await usersService.findOne({email:email});
        if(!user){ //debo crearlo
            let newUser = {
                login,
                id,
                password: '',
            }
            let result = await usersService.create(newUser);
            return done (null,result);
        }else{//si encontro el usuario
            return done (null,user);
        }
    }))

    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })
    passport.deserializeUser(async(id,done)=>{
        let result = await usersService.findOne({_id:id});
        return done(null,result);
    })
}
export default initializePassport;