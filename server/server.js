const express = require("express");
const app = express();
const mongoose = require("mongoose");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
require("dotenv").config();
const routes = require("./routes");
const passport = require("passport");
const { jwtStrategy } = require("./middlewares/passport");

const { handleError, convertToApiError } = require("./middlewares/apiError");

//mongodb
const mongoUri = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

///body parser
app.use(express.json());

///sanitize
app.use(xss());
app.use(mongoSanitize());

///passport
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

///CORS
app.use(cors());

///routes
app.use("/api", routes);

///ApiERROR handling
app.use(convertToApiError);
app.use((err, req, res, next) => {
  handleError(err, res);
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
