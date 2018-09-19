checkSession = (req, res, next) => {
  if (req.session) {
    next();
  }
  else {
    res.status(403).send("You are not authorized");
  }
}

module.exports = checkSession;
