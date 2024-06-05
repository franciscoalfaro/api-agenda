import mongoose from "mongoose";
mongoose.set('strictQuery', false)

export const connection = async() => {

    try {
        //conexion mediante url a la BD mongo        
        await mongoose.connect("mongodb://localhost:27017/agenda");
  
        console.log("Connection success agenda")
        
    } catch (error) {
        console.log(error);
        throw new Error("The connection has been refused..");
        
    }

}
