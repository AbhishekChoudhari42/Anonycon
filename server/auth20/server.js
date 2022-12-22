const express = require("express");
const session = require("express-session");
const passport = require("passport");

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.render("home");
});

app.get(
  "/auth/google/",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  // Successful authentication Redirects to Exclusive page
  function (req, res) {
    res.redirect("/exclusive");
  }
);

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/exclusive", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("exclusive");
  } else {
    res.redirect("/");
  }
});

app.get("/logout", (req, res) => {
  req.logout(req.user, (err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});
