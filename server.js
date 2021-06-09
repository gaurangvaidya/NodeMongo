//Requires
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./api/routes/index');

const app = express();

app.use(express.json());
//Connect To DB
mongoose.connect("mongodb://127.0.0.1:27017/node",{useNewUrlParser: true, useUnifiedTopology: true},()=>{
    console.log("DB CONNECTED");
})



routes(app);

app.listen(3000,()=>{

    console.log("Server IS Running");
});







