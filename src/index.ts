import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  throw new Error("MongoDB URL is not defined in .env file");
}

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World with TypeScript!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
