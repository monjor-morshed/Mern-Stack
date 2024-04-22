import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import todoRoutes from "./routes/todoRoutes.js";

// express app
const app = express();
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
app.use(cors());
// Home
app.get("/", (req, res) => {
    res.json({ message: "Welcome" });
});
// All Routes
app.use("/todos", todoRoutes);
//db connect
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Database App Connected");
        // listen to port
        const PORT = process.env.PORT;
        app.listen(PORT, () => {
            console.log(`Listening on PORT ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
