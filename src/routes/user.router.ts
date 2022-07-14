import {Router} from "express";
import {UserController} from "../controller/user.controller";

const userController = new UserController();
const userRoutes = Router();

userRoutes.get("/:username", (req, res) =>{
    userController.showPagePerson(req,res)
})

userRoutes.post("/add/status",(req, res) =>{
    userController.addStatus(req,res)
})

// userRoutes.get("/delete",(req,res)=>{
//     console.log(req.query.id);
// })
export default userRoutes