const express = require("express");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const passportSetup = require("../passport/passportSetup");
const { handleAuthCallback } = require("../routes/authRoutes");
const errorMiddleware = require("./errorMiddleware");

const middleware = express();
// Middleware setup

middleware.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend domain
    credentials: true,
  })
);

middleware.use(express.json());
middleware.use(express.urlencoded({ extended: true }));
middleware.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
passportSetup.serializeUser((profile, done) => {
  // Serialize user object (store user data in session)
  const sessionUser = {
    id: profile.id,

    // ... other user properties or additional data
  };
  done(null, sessionUser);
});

passportSetup.deserializeUser((sessionUser, done) => {
  // Retrieve user object using the stored session data
  // Here you can directly use sessionUser to reconstruct the user object
  done(null, sessionUser);
});

middleware.use(passportSetup.initialize());
middleware.use(passportSetup.session());

middleware.get("/", (req, res) => {
  res.redirect("http://localhost:3000/login");
});

handleAuthCallback(middleware);

// Passport serialization and deserialization

// Endpoint to handle token refresh requests
middleware.post("/api/refresh-token", (req, res) => {
  // Extract the refresh token from the request payload or query parameters
  const refreshToken = req.body.refreshToken || req.query.refreshToken;
  // Logic to handle token refresh...
  // Respond with appropriate data
});

// Endpoint to handle redirect requests
middleware.get("/api/redirect", (req, res) => {
  // Logic to handle the "/api/redirect" endpoint
  // Respond with appropriate data
  res.json({ message: "Redirect endpoint accessed successfully." });
});

const publicPath = path.join(__dirname, "../..", "dist"); // Construct the correct path to the public folder
middleware.use(express.static(publicPath));

// Catch-all route to serve index.html for all routes
middleware.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

middleware.use(errorMiddleware);

module.exports = middleware;
