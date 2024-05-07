import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../mongoose/schemas/user";
import { comparePassword } from "../utils/passwords";

passport.serializeUser((user, done) => {
  console.log("Serializing user:", user);
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await User.findOne({ _id: id });
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
      console.log("this is finded user ", findUser);
      if (!findUser) throw new Error("User not found");
      if (!comparePassword(password, findUser.password))
        throw new Error("Invalid Credentials");
      done(null, findUser);
    } catch (error) {
      done(error);
    }
  })
);
