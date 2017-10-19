var passport = require("passport")

// GET /signup
function getSignup(req, res) {
  res.render('sign-up', { message: req.flash('errorMessage') })
}

// POST /signup
function postSignup(req, res) {
  console.log(req.body);
  console.log("\nPOST HIT\n");
  var signupStrategy = passport.authenticate('local-signup', {
    successRedirect: "/",
    failureRedirect: "/sign-up",
    failureFlash: true
  });

  return signupStrategy(req, res);
}

// GET /login
function getLogin(req, res) {
  res.render('login', { message: req.flash('errorMessage') })
}

// POST /login
function postLogin(req, res) {
  var loginStrategy = passport.authenticate('local-login', {
    successRedirect: "/loggedin",
    failureRedirect: "/login",
    failureFlash: true
  });

  return loginStrategy(req, res);
}

// GET /logout
function getLogout(req, res) {
  req.logout();
  res.redirect("/");
}

// Restricted page
function getLoggedIn(req, res){
  res.render("loggedin");
}

module.exports = {
  getLogin: getLogin,
  postLogin: postLogin ,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout,
  getLoggedIn: getLoggedIn
}