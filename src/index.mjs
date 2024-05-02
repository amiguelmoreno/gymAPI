import mongoose from "mongoose";
import { createApp } from "./createApp.mjs";

mongoose
  .connect("mongodb://127.0.0.1:27017/tutorial_express")
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(`Error: ${err}`));

const app = createApp();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
