import mongoose from 'mongoose';

let isConnected = false; //track connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log("is running")
        return
    }
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.MONGO_DBNAME,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        isConnected = true;
        console.log("MongoDB connected")
    }catch(error){
        console.log(error)
    }
}