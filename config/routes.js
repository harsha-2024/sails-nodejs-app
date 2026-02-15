
/**
 * config/routes.js
 */
module.exports.routes = {
  'GET /':                  { action: 'contact/index' },
  'GET /contacts':          { action: 'contact/index' },
  'GET /contacts/new':      { action: 'contact/new' },
  'POST /contacts':         { action: 'contact/create' },
  'GET /contacts/:id':      { action: 'contact/show' },
  'GET /contacts/:id/edit': { action: 'contact/edit' },
  'POST /contacts/:id':     { action: 'contact/update' },
  'POST /contacts/:id/delete': { action: 'contact/destroy' },
  'GET /healthz': (req, res) => res.ok({ up: true })
};
