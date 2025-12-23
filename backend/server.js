import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import router from "./routes/test.Routes.js";
import userRoutes from "./routes/user.Route.js"
import todoRoutes from "./routes/todo.Route.js"
import dbConnection from "./config/db.js";

// env config
dotenv.config();

//db connection
dbConnection()

//rest object

const app = express();

app.use(express.json())

//midlleware
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
//routes
app.use("/api/v1/test", router)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/todo',todoRoutes)
//Port
const PORT = process.env.PORT || 8000

//listen

app.listen(PORT,()=>{
  console.log(`Server is running ${process.env.DEVMODE} mode on Port ${PORT}`
    .bgGreen
  )
})