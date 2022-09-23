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
const server = app.listen(8080,(console.log("Welcome")));
initializePassport();
app.use(passport.initialize());
app.use(passport.session());