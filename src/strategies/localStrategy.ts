import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../mongoose/schemas/user";

passport.serializeUser((user, done) => {
  console.log("Serializing user:", user);
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  try {
    const findUser = await User.findOne({ user });
    if (!findUser) throw new Error("User not found");
    done(null, findUser);
  } catch (error) {
    done(error);
  }
});

export default passport.use(
  new Strategy(async (username, password, done) => {
    console.log("username", username);
    console.log("password", password);
    try {
      const findUser = await User.findOne({ username });
      if (!findUser) throw new Error("User not found");
      if (findUser.password !== password)
        throw new Error("Invalid Credentials");
      done(null, findUser);
    } catch (error) {
      done(error);
    }
  })
);
