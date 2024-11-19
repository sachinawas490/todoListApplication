import mongoose from "mongoose";

const db=async ()=>{

    await mongoose.connect('mongodb://localhost:27017/todos')
    .then(()=>{console.log("connected successfully")})
    .catch((err)=>{console.log(`error occured ${err}`)})
     
}

export default db;