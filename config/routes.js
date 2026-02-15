
module.exports.routes = {
  // Home
  'GET /': { action: 'contact/index' },

  // Auth
  'GET /signup': { action: 'auth/signup-form' },
  'POST /signup': { action: 'auth/signup' },
  'GET /login': { action: 'auth/login-form' },
  'POST /login': { action: 'auth/login' },
  'POST /logout': { action: 'auth/logout' },

  // Contacts - web UI
  'GET /contacts': { action: 'contact/index' },
  'GET /contacts/new': { action: 'contact/new' },
  'POST /contacts': { action: 'contact/create' },
  'GET /contacts/:id': { action: 'contact/show' },
  'GET /contacts/:id/edit': { action: 'contact/edit' },
  'POST /contacts/:id': { action: 'contact/update' },
  'POST /contacts/:id/delete': { action: 'contact/destroy' },

  // Health
  'GET /healthz': (req, res) => res.ok({ up: true })
};
