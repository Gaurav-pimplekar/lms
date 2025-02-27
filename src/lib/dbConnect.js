import mongoose from "mongoose";

async function dbConnect() {
  try {

    mongoose.connect("mongodb+srv://bitmjin29:gaurav21032001@cluster0.kkkgg.mongodb.net/");
    console.log("database connected successfully");
    
  } catch (error) {
    console.log("error to connect database");
  }
}

export default dbConnect;
