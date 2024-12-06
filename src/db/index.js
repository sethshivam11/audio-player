import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`\nMongoDB connected || ${connectionInstance.connection.host}`);
    return connectionInstance;
  } catch (error) {
    console.log(`\nMongoDB connection error !!!!\n${error.message}`);
    process.exit(1);
  }
};

export default connectDb;
