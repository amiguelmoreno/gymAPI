import { Request, Response, Router } from "express";
import { Exercise } from "../mongoose/schemas/exercise";
import { validateRoutine } from "../middlewares/validateRoutine";
import { Routine } from "../mongoose/schemas/routine";
import { exercises } from "../mongoose/exercisesTemplate";

const router = Router();

router.post(
  "/routines",
  validateRoutine,
  async (req: Request, res: Response) => {
    const { muscleGroups, routineName, exercisesNumber } = req.body;

    console.log(req.body);

    try {
      const limitPerGroup = Math.ceil(exercisesNumber / muscleGroups.length);

      const exercises = await Exercise.aggregate([
        {
          $match: {
            $or: muscleGroups.map((group: string) => ({
              muscleGroup: { $regex: `^${group}$`, $options: "i" },
            })),
          },
        },
        { $sort: { name: 1 } },
        {
          $group: {
            _id: "$muscleGroup",
            exercises: { $push: "$$ROOT" },
          },
        },
        {
          $project: {
            exercises: { $slice: ["$exercises", limitPerGroup] },
          },
        },
      ]);

      const selectedExercises = exercises
        .reduce((acc, group) => acc.concat(group.exercises), [])
        .slice(0, exercisesNumber);

      const newRoutine = new Routine({
        routine_id: routineName,
        exercises: selectedExercises,
        exercisesNumber: selectedExercises.length,
      });

      const savedRoutine = await newRoutine.save();

      res.status(201).json(savedRoutine);
    } catch (error) {
      console.error("Error creating routine", error);
      res.status(500).send("Error creating routine");
    }
  }
);

export default router;
