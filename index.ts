import express from 'express';
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import  mongoose from "mongoose";
import passport from "./src/middleware/passport.google"
import authRoutes from "./src/routes/auth.router"
import userRoutes from "./src/routes/user.router";
import appRoot from "app-root-path";
import errorToSlack from 'express-error-slack'
import cors from "cors"
import path from "path";
import session from "express-session";
import chatRouter from "./src/routes/chat.router";
import http from 'http';
import { Server } from "socket.io";


const port =3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

//set view engine
app.set('view engine', 'ejs');
app.set("views",'./src/views')

//cau hinh bien moi truong + connect DB
dotenv.config()
mongoose.connect(process.env.MONGODB_URL,()=>{
    console.log("connect success")
})

//static file
const rootPath=appRoot.path;
let publicPath = path.join(rootPath, "src", "public");
app.use(express.static(publicPath));

//tranh tan cong cors + cau hinh body+ passport
app.use(cors())
app.use(bodyParser.json())
app.use(session({
    secret:'SECRET',
    resave: false,
    saveUninitialized: true,
    cookie:{secure: true,maxAge:60*60}
}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(passport.initialize());
app.use(passport.session());

//cac router
app.use("/auth",authRoutes);
app.use('/user',userRoutes);
app.use('/chat', chatRouter);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('client-send-message',data =>{
      io.sockets.emit('server-send-message',data)
  })
});




//cac router bi loi trong qua trinh chay auto vao day + ve slack
app.use(errorToSlack({webhookUri:"https://hooks.slack.com/services/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"}))
app.use((err, req, res,next) => {
    if (err) {
        res.json({message:err})
    }
})


server.listen(port,()=>{
    console.log("http://localhost:"+port)
})



