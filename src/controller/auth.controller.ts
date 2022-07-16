import {User} from "../schema/user.model";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import {Status} from "../schema/status.model";
import cookie from "cookie"
export class AuthController {

    static async login(req, res) {

        let cookieClient=cookie.parse(req.headers.cookie||'')
        if(cookieClient.cookie_user){
            jwt.verify(cookieClient.cookie_user,process.env.NUMBER_SECRET_TOKEN,(err,decoded)=>{
                if(err){
                    return res.json({message:err.message})
                }else {
                    if(decoded.admin===true){
                       res.redirect('/auth/admin')
                    }else {
                        res.redirect('/auth/user')
                    }
                }
            })
        }
       await res.render('./user/login',{display:"none"})
    }

    static async logout(req, res) {
        res.cookie("cookie_user", '')
        return res.render('./user/login',{display:'none'})
    }



    static async register(req, res) {
        if (req.method === 'GET') {
            return res.render('./user/register',{display:'none'})
        } else {
            const user = await User.findOne({username: req.body.username});
            if (!user) {
                //mang gom 2 phan tu : pass va again password
                let arrayPass = req.body.password
                if (arrayPass[0] === arrayPass[1]) {
                    const passwordHash = await bcrypt.hash(req.body.password[0], 10);
                    let userData = {username: req.body.username, password: passwordHash}
                    const newUser = await User.create(userData);
                    // res.json({user: newUser, code: 200})
                    return res.render('./user/login',{display:'block'})
                } else {
                    res.render('./user/register',{display:'block'})
                }
            } else {
                res.json({err: "User exited"})
            }
        }
    }

    static createTokenAndSetCookie(req, res, payload) {
        const token = jwt.sign(payload, process.env.NUMBER_SECRET_TOKEN, {expiresIn: 9999});
        res.cookie("cookie_user", token)
    }

}








