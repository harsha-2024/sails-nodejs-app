
module.exports = async function(req, res, proceed) {
  res.locals.me = null;
  if (req.session && req.session.userId) {
    try {
      const user = await User.findOne({ id: req.session.userId });
      if (user) {
        req.me = user;
        res.locals.me = user;
      }
    } catch (e) {
      // ignore
    }
  }
  return proceed();
};
