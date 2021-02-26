const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
require("express-async-errors");

const blogRoutes = require("./routers/blog");
const usersRoutes = require("./routers/users");
const middleware = require("./utils/middleware");

const app = express();

app.use(express.json());
app.use(cors());

morgan.token("bodyContent", (request, response) => request.body);
morgan.token("path", (request, response) => request.path);

app.use(
  morgan(
    ":method :path :status - :response-time ms :res[content-length] :bodyContent"
  )
);

let MONGODB_URI = process.env.TEST_MONGODB_URI;
if (process.env.NODE_ENV === "test") {
  const testsRoutes = require("./routers/tests");
  MONGODB_URI = process.env.TEST_MONGODB_URI;
  app.use("/api/testing", testsRoutes);
}
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((res) => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.static("build"));

app.use(middleware.tokenExtractor);
app.use("/api/posts", blogRoutes);
app.use("/api/users", usersRoutes);

app.use(middleware.error404);
app.use(middleware.errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app };
