import mongoose from "mongoose";
import colors from "colors";

const dbConnection  = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database Connected Successfully ${mongoose.connection.host}`
      .bgBlue.white
    )
  } catch (error) {
    console.log(`MongoDb Error ${error}`
      .bgRed.white
    )
  }
}

export default dbConnection;