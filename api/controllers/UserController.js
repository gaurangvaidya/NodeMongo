const { model } = require('mongoose');
const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const { createToken } = require('../middlewares/authentication');


const createPasswordHash = (password) =>{

    return new Promise((res,rej)=>{
        try{
            bcrypt.hash(password,10,(err,hashed)=>{
                if(hashed)
                {
                    res(hashed);
                }
                else if(err)
                {
                    rej(err);
                }

            })  

        }
        catch(err){
            rej(err);
        }


    });
   
}

const verifyPassword = (password,hash) => {

    return new Promise((resolve,reject)=>{

        try{

            bcrypt.compare(password,hash,(err,isValid)=>{

                if(err){
                    reject(err);
                }
                else{
                    resolve(isValid);
                }
                
                

            });


        }
        catch(err){
            reject(err);
        }


    });



}

module.exports.register = async (req,res)=>{
    try
    {

    const hashedPassword = await createPasswordHash(req.body.password);

       
     const user = {
         "userid":req.body.userid,
         "firstname":req.body.firstname,
         "lastname":req.body.lastname,
         "password":hashedPassword
     }

     const userData = await  UserModel.create(user);
     delete userData._doc.password

     res.send(userData);

     
        
    }
    catch(err)
    {

        res.json(err);
    }
    
}


module.exports.getUserById = async (req,res)=>{

    try{

        const id = JSON.parse(req.params.id);
        const userData = await UserModel.findOne({userid:id});
        res.send(userData);


    }
    catch(err){
        res.json(err);

    }
    
}

module.exports.getAll = async (req,res)=>{

    try
    {

        const users = await UserModel.find();
        res.json(users);
    }
    catch(err)
    {
        res.json(err)
    }


}

module.exports.deleteUser = async (req,res)=>{
    try{

        const id = JSON.parse(req.params.id);
        const userToDelete  = await UserModel.findOneAndDelete({userid:id});
        res.send(userToDelete);

    }
    catch(err){
        res.json(res);
    }


}

module.exports.updateUser = async (req,res)=>{
    try{
        const id = JSON.parse(req.params.id);
        const userToUpdate = await UserModel.findOneAndUpdate({userid:id},req.body,{new:true});
        res.send(userToUpdate);

    }
    catch(err)
    {
        res.json(err);
    }
}

module.exports.login = async (req,res)=>{

    try{

        const user = await UserModel.findOne({userid:req.body.userid});

        if(!user){
            res.status(401).json("Invalid Authentication");
        }
        else{

            const isValidPass = await verifyPassword(req.body.password,user.password);
            const token = createToken(user.userid);
            if(isValidPass)
            {
               res.json({message:"Logged In",token:token});
            }
            else{
                res.status(401).json("Invalid Authentication");
            }
            
        }
        



    }
    catch(e){
        res.json(e)
    }
    

}