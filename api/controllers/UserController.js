const { model } = require('mongoose');
const UserModel = require('../models/UserModel');

module.exports.register = async (req,res)=>{
    try
    {
       
     const user = {
         "userid":req.body.userid,
         "firstname":req.body.firstname,
         "lastname":req.body.lastname,
     }

     const userData = await  UserModel.create(user);

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
