const passportSetup = require("../passport/passportSetup");
const querystring = require("querystring");
const path = require("path"); // Import the path module
let redirectPath = "/login";
require("dotenv").config();

function handleAuthCallback(app) {
  // Authentication routes

  app.get(
    "/auth/discord",
    passportSetup.authenticate("discord", {
      scope: ["guilds"], // Request only the guilds scope
    })
  );

  app.get(
    "/auth/discord/callback",
    passportSetup.authenticate("discord", {
      failureRedirect: "http://localhost:3000/buy", // Redirect to the login page if authentication fails
    }),
    async (req, res) => {
      // Assuming you have verified the user's credentials and obtained their access token
      const userId = req.user.isAuthorized;

      // Redirect the user to the home page or any other protected route
      res.redirect("http://localhost:3000/home");
    }
  );
}

module.exports = {
  handleAuthCallback,
};
