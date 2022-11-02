import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mongoose from 'mongoose';
import storage from 'session-file-store';
import session from 'express-session';
import initializePassport from './config/passport.config.js';
import passport from 'passport';
import minimist from 'minimist';
import config from './config/config.js';
import os from 'os';


/* const {
    MODE,
    PORT,
    DEBUG
}= minimist.apply(process.argv.slice(2),{alias:{m:"MODE",p:"PORT",d:"DEBUG"},default:{m:'prod',p:0,d:false}});

const config = {
    mode : MODE,
    port: PORT,
    debug: DEBUG,
    others: _
}

console.log(config); */
const cpus = os.cpus.length;
console.log(cpus);
const app = express();
const FileStorage = storage(session);
const connection = mongoose.connect('mongodb+srv://MONGODB:123@mongodb.mgpqn0y.mongodb.net/mongosh?retryWrites=true&w=majority')
app.use(express.json());
app.use(express.static(__dirname+'/public'));
app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');
app.use('/',viewsRouter);
app.use('/api/sessions',sessionsRouter);
console.log(config.app)
const PORT = process.env.PORT||8080
app.listen(PORT,(console.log(`Listening on ${PORT}`)));
initializePassport();
app.use(passport.initialize());
app.use(passport.session());