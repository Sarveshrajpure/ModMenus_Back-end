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

//Socket io
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

//Socket io connections

io.on("connection", (socket) => {
  console.log("socket.io: User connected: ", socket.id);

  socket.on("disconnect", () => {
    console.log("socket.io: User disconnected: ", socket.id);
  });
});

//mongodb
const mongoUri = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Mongodb realtime connected");

  console.log("Setting change streams");

  const ordersChangeStream = connection.collection("orders").watch();

  ordersChangeStream.on("change", (change) => {
    switch (change.operationType) {
      case "insert":
        const order = {
          _id: change.fullDocument._id,
          businessId: change.fullDocument.businessId,
          guestId: change.fullDocument.guestId,
          guestName: change.fullDocument.guestName,
          tableNumber: change.fullDocument.tableNumber,
          items: change.fullDocument.items,
          total: change.fullDocument.total,
          status: change.fullDocument.status,
        };
        console.log(order);
        io.of("/api/socket").emit("newOrder", order);
        break;
    }
  });
});

//config for img upload
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

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
server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
