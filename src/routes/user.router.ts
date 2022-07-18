import {Router} from "express";
import {UserController} from "../controller/user.controller";


const userRoutes = Router();


userRoutes.get("/:username",UserController.showPagePersonal)

userRoutes.post("/add/status",UserController.addStatus)

userRoutes.get("/delete/:id",UserController.deleteStatus)

userRoutes.get("/update/:id",UserController.updateStatus)
userRoutes.post("/update",UserController.updateStatus)
// userRoutes.post("/message",UserController.saveMessage)



export default userRoutes