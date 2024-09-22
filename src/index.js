import env from "dotenv";
import express from "express";
import postController from "./controller/postController.js";

env.config();

const {
    APP_PORT    
} = process.env;


const app = express();
app.use(postController);

app.listen(APP_PORT,()=>{
    console.log(`APP IS RUNNING ON ${APP_PORT}`);
});


