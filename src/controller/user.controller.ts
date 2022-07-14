import jwt from "jsonwebtoken"
import {Status} from "../schema/status.model";
import {User} from "../schema/user.model";

export class UserController{
    async showPagePerson(req,res){
        let user = await User.findOne({username: req.params.username})
        const idUser= user._id
        console.log(idUser)
        const statuses = await Status.find({user: idUser})
        let data = {
            idUser: idUser,
            statuses: statuses
        }
        res.render('./user/personal',{data:data})
    }
    async addStatus(req,res){
        const userID = req.body.ID;
        console.log(userID)
        const userSelect = await User.find({_id: userID});
        const statusNew = new Status({
            content: req.body.content,
            user: userSelect[0]
        })
        await statusNew.save();
        res.redirect(`/user/${userSelect[0].username}`);
    }

    takeNameUser(req,res,next){
        let accessToken=req.headers.cookie.cooki_user
        jwt.verify(accessToken,process.env.NUMBER_SECRET_TOKEN,(err,decoded)=>{
            if(err){
                return res.json({message:err.message})
            }else {
                let name = decoded.username
                    next();
            }
        })
    }

}