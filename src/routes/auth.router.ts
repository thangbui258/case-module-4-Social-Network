import express from "express";
import passport from "passport"
const router = express.Router();
import {Auth} from "../middleware/authorization.middlleware"
import wrapperError from "../containsError/error"
import {AuthController} from "../controller/auth.controller"


// router.use("/",Auth.isAdmin)


router.get('/login',wrapperError(AuthController.login ))

router.post("/login", wrapperError(AuthController.login ));




router.get('/register', wrapperError(AuthController.register ))

router.post("/register",  wrapperError(AuthController.register ));


router.get('/google',passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback',passport.authenticate('google', { failureRedirect: '/login' }),
    async function(req, res) {

          // await AuthController.createTokenAndSetCookie(req,res,)


         res.render('./user/user')
    });



export default router