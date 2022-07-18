import jwt from "jsonwebtoken"
import {Status} from "../schema/status.model";
import {User} from "../schema/user.model";
import Message from "../schema/message";

export class UserController {


    static async showPagePersonal(req, res) {
        let Data = req.headers.cookie
        if (Data) {
            let accessToken = Data.split('=')[1]
            jwt.verify(accessToken, process.env.NUMBER_SECRET_TOKEN, async (err, decoded) => {
                if (err) {
                    return res.json({message: err.message})
                } else {
                    let payload = decoded;
                    let idUser = payload.user_id;
                    const name = req.params.username
                    const userSelect = await User.findOne({username: name});
                    const statuses = await Status.find({user: userSelect._id});
                    const listUser = await User.find();
                    if (payload.username == req.params.username) {
                        let data = {
                            block: 'block',
                            idUser: idUser,
                            statuses: statuses,
                            listUser: listUser
                        }
                        res.render('./user/personal', {data: data})
                    } else {
                        let data = {
                            block: 'none',
                            idUser: idUser,
                            statuses: statuses,
                            listUser: listUser
                        }
                        res.render('./user/personal', {data: data})
                    }


                }
                console.log(req.params)
            })
        } else {
            res.json({message: "chua dang nhap"})
        }
    }

    static async addStatus(req, res) {
        const userID = req.body.ID;
        const userSelect = await User.find({_id: userID})
        const statusNew = new Status({
            content: req.body.content,
            user: userSelect[0]
        })
        await statusNew.save();
        res.redirect(`/user/${userSelect[0].username}`);
    }

    static async addStatusHome(req, res) {
        const userID = req.body.ID;
        const userSelect = await User.find({_id: userID})
        const statusNew = new Status({
            content: req.body.content,
            user: userSelect[0]
        })
        await statusNew.save();
        res.redirect('/auth/home');
    }


    static async deleteStatus(req, res) {
        //b1:di tim tên để tý điều hướng về /user/nameUser đó
        let status = await Status.findOne({_id: req.params.id})
        let userID = status.user;
        let user = await User.findOne({_id: userID})
        //chinh thuc lay dc name user
        let nameUser = user.username;

        //b2:xoa +dieu huong nameUser
        await Status.deleteOne({_id: req.params.id});
        res.redirect(`/user/${nameUser}`)
    }

    static async updateStatus(req, res) {
        if (req.method === "GET") {
            let status = await Status.findOne({_id: req.params.id})
            let userID = status.user;
            let user = await User.findOne({_id: userID})
            //chinh thuc lay dc name user
            let nameUser = user.username;

            let data = {
                userName: nameUser,
                idStatus: req.params.id,
                contentStatus: status.content
            }

            res.render('./user/updateStatus', {data: data})
        } else {
            console.log(req.body)
            let userUpdateStatus = req.body.userUpdate;
            let idStatusUpdate = req.body.idStatus;
            let contentStatusUpdate = req.body.statusUpdate

            await Status.updateOne({_id: idStatusUpdate}, {content: contentStatusUpdate})

            res.redirect(`/user/${userUpdateStatus}`)
        }
    }

    static takeNameUser(req, res, next) {
        let accessToken = req.headers.cookie.cooki_user
        jwt.verify(accessToken, process.env.NUMBER_SECRET_TOKEN, (err, decoded) => {
            if (err) {
                return res.json({message: err.message})
            } else {
                let name = decoded.username
                next();
            }
        })
    }

}