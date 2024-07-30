const express=require("express")
const bodyParser=require("body-parser")
const fs=require('fs')
const routes=require("./routes/Route")

const app=express();

//middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//route
app.use("/api/",routes);


app.listen(4400,()=>{
    console.log("server running at port 4400")
})