
import express from "express";
import cors from "cors";
import cookieparse from "cookie-parser";

const app = express()

app.use(express.json());

app.use(cors(
    {
        origin:[process.env.FRONTEND_URL],
        credentials:true
    }
));

app.use(cookieparse())

app.use('/ping',(req,res)=>{
    res.send("Pong");
});

export default app;
