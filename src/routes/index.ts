import { Request, Response, Router } from "express";
import usersRouter from "./users";
import exercisesRouter from "./exercises";
import routinesRouter from "./routines";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello World with TypeScript!");
});

router.use(usersRouter);
router.use(exercisesRouter);
router.use(routinesRouter);

export default router;
