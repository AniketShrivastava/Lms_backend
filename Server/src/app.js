
import express from "express";
import cors from "cors";
import cookieparse from "cookie-parser";
import  userRoutes  from "./routes/user.routes.js";
import errorMiddleware from './middleware/error.middleware.js';
import morgan from "morgan"

const app = express()

app.use(express.json());

app.use(cors(
    {
        origin:[process.env.FRONTEND_URL],
        credentials:true
    }
));

app.use(morgan("dev"));

app.use(cookieparse())

app.use('/ping',(req,res)=>{
    res.send("Pong");
});

//routes 

app.use("/api/v1/user",userRoutes)

app.use("*",(req,res)=>{
    res.status(404).send('OOPS!! 404page not found')
})

app.use(errorMiddleware);

export default app;
