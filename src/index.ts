import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes/index";
import cookieParser from "cookie-parser";

mongoose
  .connect("mongodb://localhost/gymAPI")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World with TypeScript!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Script to add exercises template of 48 different exercises
/* Exercise.insertMany(exercises)
  .then(() => console.log("Exercises added successfully!"))
  .catch((err) => console.error("Failed to insert exercises: ", err)); */
