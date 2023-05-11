const express=require("express");
const bodyParser=require("body-parser");
const detailsRouter=require("./router/personal_details");
const coronaRouter=require("./router/corona_details");
const mongoose=require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app=express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, 
    socketTimeoutMS: 45000, 
    family: 4 
  };
const db =require('./model');
db.mongoose.set('strictQuery', true);

db.mongoose.connect(process.env.URL,options).then(()=>{
    console.log("conected to the database");
})
.catch(err=>{
    console.log("can not connect to the database",err);
    process.exit();
});


app.listen(process.env.PORT,()=>{
    console.log("server is up port "+ process.env.PORT);
})

app.get("/api",(req,res)=>{
    res.send("Api is up");
})

app.use("/api/people",detailsRouter);
app.use("/api/corona",coronaRouter);