const mongoose=require("mongoose")

const connectDB= async ()=>{
try{
    let connection=await mongoose.connect('mongodb://localhost:27017/AllUsers')

    if(connection){
        console.log("MongoDB connection successfull")
    }

}catch(error){
    console.log(error)
}
}
module.exports=connectDB