import { Request, Response, Router } from "express";
import { User } from "../mongoose/schemas/user";
import {
  query,
  checkSchema,
  matchedData,
  validationResult,
} from "express-validator";
import { userValidationSchema } from "../utils/validationSchema";
import { hashPassword } from "../utils/passwords";

const router = Router();

router.get("/users", async (req, res) => {
  req.sessionStore.get(req.session.id, (err, sessionData) => {
    if (err) {
      throw err;
    }

    console.log(sessionData);
  });

  try {
    const users = await User.find();
    return res.send(users);
  } catch (error) {
    return res.sendStatus(400);
  }
});

router.post(
  "/users",
  checkSchema(userValidationSchema),
  async (req: Request, res: Response) => {
    const result = validationResult(req);

    if (!result.isEmpty()) return res.status(400).send(result.array());

    const data = matchedData(req);
    data.password = hashPassword(data.password);
    const newUser = new User(data);

    console.log(newUser);

    try {
      const savedUser = await newUser.save();
      return res.status(201).send(savedUser);
    } catch (err) {
      return res.sendStatus(400);
    }
  }
);

export default router;
