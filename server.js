import express from "express";
import mongoose from "mongoose";
import Router from "./routes/userRoute.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import { authenticate, authorize } from "./middlewares/auth.js";

const app = express();
app.use(cors());
app.use(express.json());
const dbuser=encodeURIComponent(process.env.DBUSER) 
const dbpass=encodeURIComponent(process.env.DBPASS)


// mongoose.connect(`mongodb://localhost:27017/mern-cafe`).then(() => {
//   app.listen(8000, () => {
//     console.log("Server started");
//   });
// });


// const dbuser=encodeURIComponent(process.env.DBUSER) 
// const dbpass=encodeURIComponent(process.env.DBPASS)

mongoose.connect(`mongodb+srv://${dbuser}:${dbpass}@cluster0.ucggsmz.mongodb.net/mern-cafe?retryWrites=true&w=majority&appName=Cluster0
`).then(() => {
  app.listen(8000, () => {
    console.log("Server started");
  });
});

app.use("/api/users", Router);