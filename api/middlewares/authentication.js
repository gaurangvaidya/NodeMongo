const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel');

module.exports.createToken = (userid) => {
    const token = jwt.sign({userid},"secret",{expiresIn:60*60});
    return token;


}

module.exports.verifyToken = (req,res,next)=> {

    console.log("reached");
    const token = req.header('AuthToken');
    if(!token){
        res.status(401).json({message:"Access Denied"});
    }
    try{

        jwt.verify(token,"secret",async (error,decoded)=>{

           
            console.log(decoded);
    
            if(!error){
    
                const user = await UserModel.findOne({userid:decoded.userid});
    
                if(user){
                    next();
                }
                else
                {
                    res.status(401).json({
                        message:"Unauthorized"
                    });
        

                }
    
               
    
    
    
    
            }
            else {
                res.status(401).json({
                    message:"Unauthorized"
                });

            }
    
        });
    

    }
    catch(e){
        res.json({
            message:e
        })
    }

}


