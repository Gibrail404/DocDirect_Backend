import mongoose from "mongoose";

export const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "MERN_STACK_MANAGEMENT_SYSTEM_DEPLOYED",
    }).then(()=>{
        console.log("Database connected !!");
    }).catch(err =>{
        console.log(`Error Occur : ${err}`);
    });
};