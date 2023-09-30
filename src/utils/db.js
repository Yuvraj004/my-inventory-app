import mongoose from "mongoose";
const mongoURI = "mongodb+srv://yuvrajchat:jvs30vubqU00wuq3@cluster0.yjrktkq.mongodb.net/?retryWrites=true&w=majority";

async function connectToDatabase() {
  mongoose.connect(mongoURI)
    .then(() => {
      console.log("Connected to MongoDB successfully");
    })
    .catch((error) => {
      console.error("Failed to connect to MongoDB", error);
    });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
}

export default connectToDatabase;
