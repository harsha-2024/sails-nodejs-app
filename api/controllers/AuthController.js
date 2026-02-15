
const bcrypt = require('bcryptjs');

module.exports = {
  // Render signup form
  signupForm: async function(req, res) {
    return res.view('auth/signup', { values: {}, errors: [] });
  },

  // Handle signup
  signup: async function(req, res) {
    const { fullName, email, password, passwordConfirm } = req.allParams();
    const errors = [];

    if (!fullName || !fullName.trim()) errors.push({ field: 'fullName', message: 'Name is required' });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) errors.push({ field: 'email', message: 'Valid email required' });
    if (!password || password.length < 6) errors.push({ field: 'password', message: 'Password must be at least 6 characters' });
    if (password !== passwordConfirm) errors.push({ field: 'passwordConfirm', message: 'Passwords do not match' });

    if (errors.length) return res.status(422).view('auth/signup', { values: { fullName, email }, errors });

    try {
      const passwordHash = await bcrypt.hash(password, 10);
      const user = await User.create({ fullName: fullName.trim(), email: email.trim(), passwordHash }).fetch();
      req.session.userId = user.id;
      return res.redirect('/contacts');
    } catch (e) {
      if (e.code === 'E_UNIQUE') {
        return res.status(422).view('auth/signup', { values: { fullName, email }, errors: [{ field: 'email', message: 'Email already in use' }] });
      }
      sails.log.error(e);
      return res.serverError(e);
    }
  },

  // Render login form
  loginForm: async function(req, res) {
    return res.view('auth/login', { values: {}, errors: [] });
  },

  // Handle login
  login: async function(req, res) {
    const { email, password } = req.allParams();
    const errors = [];
    if (!email || !password) errors.push({ field: 'email', message: 'Email and password required' });
    if (errors.length) return res.status(422).view('auth/login', { values: { email }, errors });

    const user = await User.findOne({ email: email.trim() });
    if (!user) return res.status(422).view('auth/login', { values: { email }, errors: [{ field: 'email', message: 'Invalid credentials' }] });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(422).view('auth/login', { values: { email }, errors: [{ field: 'email', message: 'Invalid credentials' }] });

    req.session.userId = user.id;
    return res.redirect('/contacts');
  },

  // Logout
  logout: async function(req, res) {
    req.session.userId = null;
    return res.redirect('/login');
  }
};
