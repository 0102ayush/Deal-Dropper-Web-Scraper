 import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {

    mongoose.set('strictQuery', true);
    if(!process.env.MONGODB_URI){
        throw new Error('MONGO_URI is not defined');
    }
    if(isConnected){
        return console.log('=> using existing database connection');  
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI)
        isConnected = true;
        console.log('=>database connected');
    } catch (error: any) {
        console.log(error)
    }
}
