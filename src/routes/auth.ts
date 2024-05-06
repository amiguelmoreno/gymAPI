import passport from "passport";
import { Request, Response, Router } from "express";

const router = Router();

router.post(
  "/api/auth",
  passport.authenticate("local"),
  (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);

router.get("/api/auth/status", (request, response) => {
  return request.user ? response.send(request.user) : response.sendStatus(401);
});

router.post("/api/auth/logout", (request, response) => {
  if (!request.user) return response.sendStatus(401);
  request.logout((err) => {
    if (err) return response.sendStatus(400);
    response.send(200);
  });
});

export default router;
