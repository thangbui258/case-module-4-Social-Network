import express from "express";
import path from "path";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const port = `${process.env.PORT}`||3000;


const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set("views",path.join( __dirname, "views" ));


 mongoose.connect(`${process.env.DB_MONGO}`,()=>{
     // tslint:disable-next-line:no-console
     console.log("connect DB successfully")
 });





// app.use('/user',userRouter)
app.get('/',(req,res)=>{
    res.render('./user/register');
})


app.listen(port)



