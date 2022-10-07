import dotenv from'dotenv';

dotenv.config();

export default {
    app:{
        MODE:process.env.MODE||'PROD',
        DEBUG:process.env.DEBUG||false
    },
    mongo:{
        MONGO_URL:process.env.MONGO_URL,
        MONGO_USER:process.env.MONGO_USER,
    }
}