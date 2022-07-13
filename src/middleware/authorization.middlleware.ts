
import jwt from "jsonwebtoken"
export class Auth{

    static async isAdmin(req,res,next){

        let accessToken=req.body.access_token;
        if(accessToken){
            //tien hanh giai ma
            jwt.verify(accessToken,"123456789",(err,decoded)=>{
                if(err){
                    return res.json({message:err.message})
                }else {
                    if(decoded.admin===true){
                        next();
                    }else {
                        res.json({message:"ko du quyen"})
                    }
                }
            })
        }else {
            return  res.json({message:"no access token"})
        }

    }




}
