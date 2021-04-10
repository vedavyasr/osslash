let express = require("express");
let app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const apiRoutes = require("./routes");

app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    allowedHeaders: "*",
    exposedHeaders: "*",
  })
);
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/", apiRoutes);
app.listen(process.env.PORT || 3001, () => {
  console.log("started on port : ", process.env.PORT || 3001);
});

module.exports = app;
