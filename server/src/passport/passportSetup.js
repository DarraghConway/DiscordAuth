const passport = require("passport");
const DiscordStrategy = require("passport-discord").Strategy;
const { fetchGuildRole, hasRole } = require("../discord-api");
//const db = require("../../db");
require("dotenv").config();

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

passport.serializeUser((profile, done) => {
  // Serialize user object (store user data in session)
  const sessionUser = {
    id: profile.id,

    // ... other user properties or additional data
  };
  done(null, sessionUser);
});

passport.deserializeUser((sessionUser, done) => {
  // Retrieve user object using the stored session data
  // Here you can directly use sessionUser to reconstruct the user object
  done(null, sessionUser);
});

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: process.env.DISCORD_REDIRECT_URI,
      scope: ["guilds", "guilds.members.read"],
    },
    verify
  )
);

async function verify(accessToken, refreshToken, profile, done) {
  try {
    // Check if the user has a specific role in a specific guild
    const guildId = process.env.GUILD_ID; // Replace with the target guild ID
    const roleId = process.env.ROLE_ID; // Replace with the target role ID
    const userId = profile.id;
    console.log(profile);

    console.log("USER_ID:", userId);
    console.log("ROLE_ID:", roleId);
    console.log("GUILD_ID:", guildId);
    const guildHasSpecificRole = hasRole(profile.guilds, guildId, roleId);

    // Handle further logic based on role presence
    if (guildHasSpecificRole) {
      // User has the specific role
      console.log("The user is a member of the targeted server.");
      console.log("The role ID is now being fetched");
      const result = await fetchGuildRole(
        accessToken,
        profile.guilds,
        profile.id,
        guildId,
        refreshToken
      );

      if (result.includes(roleId)) {
        console.log("User has the targeted role.");
        return done(null, { id: profile.id, guilds: profile.guilds });
      } else {
        console.log("User does NOT have the targeted role.");
        return done("User does NOT have the targeted role.");
      }
    } else {
      console.log("The user is NOT a member in the targeted server");
      return done("The user is NOT a member in the targeted server");
    }
  } catch (error) {
    // Handle rate limit errors
    if (error.response && error.response.status === 429) {
      const retryAfter = error.response.headers["retry-after"] * 1000; // Convert to milliseconds
      console.log(
        `Rate limited. Retrying after ${retryAfter / 1000} seconds...`
      );
      await wait(retryAfter);
      return done(error, null); // Retry the request after waiting
    }

    console.error("Error processing OAuth callback:", error);
    return done(error, null);
  }
}

function initDiscordAuthCallback(server, passport) {
  server.get(
    "/auth/discord/callback",
    passport.authenticate("discord", {
      failureRedirect: "http://localhost:3000/buy", // Redirect to the login page if authentication fails
    }),
    async (req, res) => {
      // Assuming you have verified the user's credentials and obtained their access token
      // Redirect the user to the home page or any other protected route
      res.redirect("http://localhost:3000/");
    }
  );
}

function sendIfValidToFront(server, passport) {
  server.get("/userinfo", checkAuth, (req, res) => {
    res.json({
      valid: true,
    });
  });
}

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.send("not logged in :(");
}

module.exports = { passport, initDiscordAuthCallback, sendIfValidToFront }; //exported the newly created funtion 14/11
