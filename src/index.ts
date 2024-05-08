import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import "./strategies/discordStrategy";
import "./strategies/localStrategy";
import { createApp } from "./createApp";

mongoose
  .connect("mongodb://localhost/gymAPI")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

const app = createApp();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Script to add exercises template of 48 different exercises
/* Exercise.insertMany(exercises)
  .then(() => console.log("Exercises added successfully!"))
  .catch((err) => console.error("Failed to insert exercises: ", err)); */
