import mongoose from "mongoose"
const conneceDB = async() =>{
   try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Mongo DB connected successfully")
   } catch (error) {
    console.log(error.message)
    process.exit(1)
   }
}
export default conneceDB;