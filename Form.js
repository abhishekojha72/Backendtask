
const express =require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

const app = express();
app.use (bodyParser.json());

// Data conection
const mongo_Url = 'mongodb://localhost:27017/Student';
mongoose.connect (mongo_Url)
.then(()=>{console.log("connect success")})
.catch((error)=>{console.log("Connection failed",error)})

const studentSchema =  new mongoose.Schema({
     
    Studentname:{
        type: String,
        reuired:true,
        unique:true,
        lowercase:true
    },
    StudentmobileNo:{
        type: Number,
        reuired:true,
        unique:true,
        lowercase:true

    },
    Choosetraining:{
        type: String,
        reuired:true,
        unique:true,
        lowercase:true

    },
    Choosetechnology:{
        type: String,
        reuired:true,
        unique:true,
        lowercase:true

    },
    Selectyear:{
        type: String,
        reuired:true,
    },
    Studentfothername:{
        type: String,
        reuired:true,
        unique:true,
        lowercase:true
    },
    Studentemail:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    Studentalternateno:{
        type: Number,
        reuired:true,
        unique:true,
        lowercase:true
    },
    Studentcollagename:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    }
});
const Student= mongoose.model("Student",studentSchema);
app.post ("/api/student",async(req,res)=>{
    try{
        const {Studentname,StudentmobileNo,Choosetraining,Choosetechnology,Selectyear,
             Studentfothername,Studentalternateno, Studentemail, Studentcollagename}= req.body;

             if(!Studentname||!StudentmobileNo||!Choosetraining||!Choosetechnology||!Selectyear||!Studentfothername||!Studentalternateno
                ||!Studentemail||!Studentcollagename)
             {
                return res.status(400).json({message:"All field required"})
            }
            const newUser = new Student(
                {
                   Studentname,
                   StudentmobileNo,
                   Choosetraining,
                   Choosetechnology,
                   Selectyear ,
                   Studentfothername,
                   Studentalternateno,
                   Studentemail,
                   Studentcollagename
                }
            );
            await newUser.save()
            res.status(200).json({message:"User Creatrd Successfully",Student:Studentname})
    }
    catch(error){
        console.error("Error during Student",error);
        res.status(500).json({message:"Error during Student"});
    }
})



const Port = 3007;
app.listen(Port,()=>{
    console.log(`Server is running at port ${Port}`)
})