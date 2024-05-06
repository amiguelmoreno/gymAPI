import { Request, Response, Router } from "express";
import { Exercise } from "../mongoose/schemas/exercise";

const router = Router();

router.get("/exercises", async (req: Request, res: Response) => {
  try {
    const exercises = await Exercise.find(); // Fetch all exercises

    res.json(exercises);
  } catch (error) {
    console.error("Failed to retrieve exercises:", error);
    res.status(500).send("An error occurred while retrieving the exercises.");
  }
});

router.get("/exercises/:name", async (req: Request, res: Response) => {
  const exerciseName = req.params.name.replace(/-/g, " "); // Replace hyphens with spaces to match the database entry
  try {
    const exercise = await Exercise.findOne({
      name: { $regex: new RegExp("^" + exerciseName + "$", "i") },
    }); // Case insensitive search
    if (exercise) {
      res.json(exercise);
    } else {
      res.status(404).send("Exercise not found");
    }
  } catch (error) {
    console.error("Error fetching exercise:", error);
    res.status(500).send("Error retrieving exercise");
  }
});

router.get(
  "/exercises/muscles/:muscle",
  async (req: Request, res: Response) => {
    const muscleGroup = req.params.muscle;

    try {
      const exercises = await Exercise.find({
        muscleGroup: { $regex: `^${muscleGroup}$`, $options: "i" },
      });

      console.log("exercies", exercises);

      if (exercises.length > 0) {
        res.json(exercises);
      } else {
        res.status(404).send("No exercises found for this muscle group");
      }
    } catch (error) {
      console.error("Error fetching exercises for muscle group", error);
      res.status(500).send("Error retrieving exercises");
    }
  }
);

export default router;
