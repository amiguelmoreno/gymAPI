import mongoose, { Schema } from "mongoose";

const routineSchema = new mongoose.Schema({
  routine_id: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  exercises: {
    type: mongoose.Schema.Types.Array,
    required: true,
  },
  exercisesNumber: {
    type: mongoose.Schema.Types.Number,
    required: true,
  },
});

export const Routine = mongoose.model("Routine", routineSchema);
