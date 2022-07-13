import express from "express";
import passport from "passport"
const router = express.Router();
import wrapperError from "../containsError/error"
import {UserController} from "../controller/user.controller"

router.get('/login',wrapperError(UserController.login ))

router.post("/login", wrapperError(UserController.login ));


router.get('/register', wrapperError(UserController.register ))

router.post("/register",  wrapperError(UserController.register ));


router.get('/google',passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback',passport.authenticate('google', { failureRedirect: '/login' }),
    async function(req, res) {

         //  await UserController.createTokenAndSetCookie(req,res,)
         res.render('./user/user')
    });



export default router