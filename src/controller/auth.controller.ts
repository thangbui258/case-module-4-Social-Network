import {User} from "../schema/user.model";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import {Status} from "../schema/status.model";

export class AuthController {

    static async login(req, res) {
        res.cookie("cookie_user", '')
        return res.render('./user/login')
    }

    static async home(req, res) {
        if (req.method === "GET") {
            let data = req.headers.cookie
            if (data) {
                let accessToken = data.split('=')[1]

                jwt.verify(accessToken, process.env.NUMBER_SECRET_TOKEN, async (err, decoded) => {
                    if (err) {
                        return res.json({message: err.message})
                    } else {
                        let payload = decoded;
                        const listUser = await User.find();
                        const statuses = await Status.find()
                        let data = {
                            payload: payload,
                            statuses: statuses,
                            listUser: listUser
                        }
                        res.render("./user/home", {data: data})
                    }
                })
            } else {
                res.json({message: "chua dang nhap"})
            }

        } else {
            const user = await User.findOne({username: req.body.username});
            if (user) {
                const comparePass = await bcrypt.compare(req.body.password, user.password);
                if (!comparePass) {
                    return res.json({code: 404, message: "password wrong",});
                }
                let payload = {
                    user_id: user.id,
                    username: user.username,
                    admin: user.admin,
                    google_id: user.google_id
                }

                await AuthController.createTokenAndSetCookie(req, res, payload)

                if (user.admin === true) {
                    // res.json('./user/',{user:payload})
                    // res.render("./user/admin")
                } else {
                    const listUser = await User.find();
                    const statuses = await Status.find()
                    let data = {
                        payload: payload,
                        statuses: statuses,
                        listUser:listUser
                    }
                    res.render("./user/home", {data: data})
                }
            } else {
                return res.json({err: 'wrong user'});
            }
        }

    }


    static async register(req, res) {
        if (req.method === 'GET') {
            return res.render('./user/register')
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
                    return res.render('./user/login')
                } else {
                    res.json({message: "mat khau khong khop"})
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








