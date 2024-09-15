import app from "./app.js"
import connectToDB from "./config/dbConnections.js";
import { v2 } from 'cloudinary';
import dotenv from "dotenv"

// Load environment variables from .env file
dotenv.config();


const PORT = process.env.PORT || 5000 ;

v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    api_key:process.env.CLOUDINARY_API_KEY
    

})

app.listen(PORT,async()=>{
    await connectToDB();
    console.log(`App is running at http:localhost:${PORT}`)
})
