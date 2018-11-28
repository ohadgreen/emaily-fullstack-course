const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const key = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users"); // consumes the schema from mongoose model

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: key.googleClientID,
      clientSecret: key.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id }); // a query to mongodb that returns a promise

      if (existingUser) {
        // we already have a record in mongodb with this given profile id
        console.log("profile already exists: " + profile.id);
        done(null, existingUser); // tell passport everything went well. First argument is error function
      } else {
        // add a new user record to mongodb
        const user = await new User({ googleId: profile.id }).save(); // create a new instance of User in our schema, send mongodb order to save it
        done(null, user); // use the returend saved object for "done" function
      }
    }
  )
);
