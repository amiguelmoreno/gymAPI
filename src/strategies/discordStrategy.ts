import passport from "passport";
import { Strategy } from "passport-discord";
import { DiscordUser } from "../mongoose/schemas/discordUser";
import { User } from "../mongoose/schemas/user";

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await DiscordUser.findById(id);
    return findUser ? done(null, findUser) : done(null, null);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID || "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
      callbackURL: "http://localhost:3000/api/auth/discord/redirect",
      scope: ["identify"],
    },
    async (accessToken, refreshToken, profile, done) => {
      let findUser;
      try {
        findUser = await DiscordUser.findOne({ discordId: profile.id });
      } catch (err: any) {
        return done(err);
      }
      try {
        if (!findUser) {
          const newUser = new DiscordUser({
            username: profile.username,
            discordId: profile.id,
          });
          const newSavedUser = await newUser.save();
          return done(null, newSavedUser);
        }
        return done(null, findUser);
      } catch (err: any) {
        return done(err);
      }
    }
  )
);
