module.exports = {
  isSignedIn: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/signin');
  }
};
