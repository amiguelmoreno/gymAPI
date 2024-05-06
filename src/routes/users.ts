import { Request, Response, Router } from "express";
import { User } from "../mongoose/schemas/user";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { userValidationSchema } from "../utils/validationSchema";

const router = Router();

router.post(
  "/users",
  checkSchema(userValidationSchema),
  async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).send(result.array());
    const data = matchedData(req);
    const newUser = new User(data);

    try {
      const savedUser = await newUser.save();
      return res.status(201).send(savedUser);
    } catch (err) {
      return res.sendStatus(400);
    }
  }
);

export default router;
