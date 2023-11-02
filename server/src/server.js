const express = require("express");
const errorMiddleware = require("./middleware/errorMiddleware");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const { passport, initDiscordAuthCallback } = require("./passport/passportSetup");

const server = express();
const publicPath = path.join(__dirname, "../..", "dist"); // Construct the correct path to the public folder
const PORT = 3001;

server.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend domain
    credentials: true,
  })
);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
server.use(express.static(publicPath));
server.use(errorMiddleware);

server.use(passport.initialize());
server.use(passport.session());

initDiscordAuthCallback(server, passport);


// server.get("/", (req, res) => {
//   res.redirect("http://localhost:3000/");
// });


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
