import express from "express";
import path from "path";
import bodyParser from "body-parser";
const app = express();
const port = 8081;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set("views",path.join( __dirname, "views" ));

// async function main() {
//     await mongoose.connect('mongodb://localhost:27017/MangXaHoi');
// }
// main()
//     .then(res => {
//         // tslint:disable-next-line:no-console
//         console.log('Connected successfully to server');
//     })
//     // tslint:disable-next-line:no-console
//     .catch(console.error)

// app.use('/user',userRouter)
app.get('/',(req,res)=>{
    res.render('./layout/layout')
})
app.listen(port)