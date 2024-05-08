import { NextFunction, Request, Response } from "express";

export function validateRoutine(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { muscleGroups, routineName, exercisesNumber } = req.body;

  if (!muscleGroups || !routineName || exercisesNumber == null) {
    return res
      .status(400)
      .send(
        "Missing required fields: muscleGroups, routineName, and exercisesNumber must be provided."
      );
  }

  if (!Array.isArray(muscleGroups) || muscleGroups.length === 0) {
    return res.status(400).send("muscleGroups must be a non-empty array.");
  }

  if (typeof routineName !== "string" || routineName.trim().length === 0) {
    return res.status(400).send("routineName must be a non-empty string.");
  }

  if (routineName.trim().length > 20) {
    return res
      .status(400)
      .send("routineName must be smaller than 20 characters.");
  }

  if (
    typeof exercisesNumber !== "number" ||
    exercisesNumber < 1 ||
    exercisesNumber > 12
  ) {
    return res
      .status(400)
      .send("exercisesNumber must be a positive integer between 1 and 12.");
  }

  if (muscleGroups.length > exercisesNumber) {
    return res
      .status(400)
      .send(
        "ExerciseNumber must be greater or equal than the length of muscleGroups."
      );
  }

  next();
}
