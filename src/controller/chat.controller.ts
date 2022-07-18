import Message from "../schema/message";
import jwt from "jsonwebtoken"

export class ChatController {

    getMessage(req: any, res: any, next: any): any{
        let idReceive = req.params.id_user;
        let Data = req.headers.cookie
        let accessToken = Data.split('=')[1]
        jwt.verify(accessToken, process.env.NUMBER_SECRET_TOKEN, async (err, decoded) => {
            if (err) {
                return res.json({message: err.message})
            } else {
                let idSend = decoded.user_id;
                let messages1 = await Message.find({
                    idSend: idSend,
                    idReceive: idReceive
                })
                let messages2 = await Message.find({
                    idSend: idReceive,
                    idReceive: idSend
                })
                let messages = messages1.concat(messages2);
                //sap xep tin nhan trong mang messages thu tu theo thoi gian
                for(let i=0; i<messages.length;i++){
                    for (let j=i+1;j<messages.length;j++){
                        if(messages[j].time < messages[i].time){
                            let temp = messages[j];
                            messages[j] = messages[i];
                            messages[i] = temp
                        }
                    }
                }
                res.json(messages)
            }
        })
    }

    async saveMessage(req, res) {
        let Data = req.headers.cookie
        let accessToken = Data.split('=')[1]
        jwt.verify(accessToken, process.env.NUMBER_SECRET_TOKEN, async (err, decoded) => {
            if (err) {
                return res.json({message: err.message})
            } else {
                let idSend = decoded.user_id;
                const messageNew = new Message({
                    idSend: idSend,
                    idReceive: req.body.idReceive,
                    chat: req.body.message
                })
                await messageNew.save();
                res.json("oke");
            }
        })
    }


}