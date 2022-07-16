import {Router} from "express";
import {UserController} from "../controller/user.controller";
import wrapperError from "../containsError/error";


const userRoutes = Router();


userRoutes.get("/:username", wrapperError((UserController.PersonalUser)))

userRoutes.post("/add/status-personal", wrapperError((UserController.addStatusInPersonal)))
userRoutes.post('/add/status-home', wrapperError((UserController.addStatusInHome)))


userRoutes.get("/delete/:id", wrapperError((UserController.deleteStatusInPersonal)))


userRoutes.get("/update/:id", wrapperError((UserController.updateStatusInPersonal)))
userRoutes.post("/update", wrapperError((UserController.updateStatusInPersonal)))


export default userRoutes