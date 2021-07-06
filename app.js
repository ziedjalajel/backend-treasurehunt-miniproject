const express = require("express");
const cors = require("cors");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");

const thingsRoutes = require("./routes/thingsRoutes");
const usersRoutes = require("./routes/usersRoutes");

const app = express();
//middleware
app.use(cors());

app.use(express.json());

app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use(thingsRoutes);
app.use(usersRoutes);

app.use((req, res, next) => {
  const err = new Error("Path Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
});

const run = async () => {
  await app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });
};

run();
