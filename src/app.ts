import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const PORT = process.env.PORT || 3000;
const app = express();
app.set("view engine", "ejs");
app.set('views', './src/views');


mongoose.connect(`${process.env.DB_MONGO}`)
    .then(() =>{
        // tslint:disable-next-line:no-console
        console.log('DB Connected!')}
        )
    .catch(error =>{
        // tslint:disable-next-line:no-console
        console.log('DB connection error:', error.message)
    }
       );
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.render('./user/register');
})


app.listen(PORT, () => {
   // tslint:disable-next-line:no-console
    console.log("http://localhost:" + PORT)
})








