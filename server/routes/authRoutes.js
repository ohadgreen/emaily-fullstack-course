const passport = require("passport");

module.exports = app => {
  app.get("/status", (req, res) => {
    res.send({
      status: "OK"
    });
  });

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback", 
    passport.authenticate("google"), // after a user has been authenicated successfully, redirect him to dashboard component
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    //res.send("goodbye " + req.user);
    res.redirect('/');
  });

  app.get("/api/current_user", (req, res) => {
    //res.send(req.session);
    res.send(req.user);
  });
};
