const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    userid:{
        type:Number,
        unique:true,
        required:true        
    },
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    password:{
            type:String
     }
    
    
});

module.exports = mongoose.model('User',UserSchema);