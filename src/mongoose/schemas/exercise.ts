import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  name: String,
  mainMuscle: String,
  equipment: String,
  description: String,
  muscleGroup: String,
  recommendedSets: Number,
  recommendedReps: String,
});

export const Exercise = mongoose.model("Exercise", exerciseSchema);
