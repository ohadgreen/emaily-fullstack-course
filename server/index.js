const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
require("./models/User");
require("./models/Survey");
require("./services/passport");
const keys = require("./config/keys");
//const authRoutes = require("./routes/authRoutes");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // the cookie will live max. 30 days
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize()); // tell the app to use cookies
app.use(passport.session());

//authRoutes(app);
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // tell Express to server production assets like main.js
  app.use(express.static("client/build"));

  // Express will server the index.html file if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendfile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
