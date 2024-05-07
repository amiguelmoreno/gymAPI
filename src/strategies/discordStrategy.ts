import passport from "passport";
import { Strategy } from "passport-discord";
import { DiscordUser } from "../mongoose/schemas/discordUser";
import { User } from "../mongoose/schemas/user";

export default passport.use(
  new Strategy(
    {
      clientID: "1237335793677238363",
      clientSecret: "cVX08Tg4et3cb910UW2moCTu8UOWUAgq",
      callbackURL: "http://localhost:3000/api/auth/discord/redirect",
      scope: ["identify"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);

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
