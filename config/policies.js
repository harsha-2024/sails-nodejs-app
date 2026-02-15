
module.exports.policies = {
  // Attach current user to all requests for views
  '*': ['attachCurrentUser'],

  // Public auth pages
  AuthController: {
    '*': true
  },

  // Protect web UI actions
  ContactController: ['isLoggedIn', 'attachCurrentUser'],

  // Protect blueprint API for Contact model
  Contact: ['isLoggedIn']
};
