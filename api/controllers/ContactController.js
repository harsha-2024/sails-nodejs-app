
/**
 * api/controllers/ContactController.js
 * Web UI actions. JSON API is provided by Blueprints under /api/v1/contact.
 */
module.exports = {
  // List with search + pagination
  index: async function (req, res) {
    try {
      const q = (req.query.q || '').trim();
      const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
      const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 50);
      const skip = (page - 1) * limit;

      const where = q ? {
        or: [
          { firstName: { contains: q } },
          { lastName:  { contains: q } },
          { email:     { contains: q } }
        ]
      } : {};

      const [total, contacts] = await Promise.all([
        Contact.count({ where }),
        Contact.find({ where }).sort([{ lastName: 'ASC' }, { firstName: 'ASC' }]).limit(limit).skip(skip)
      ]);

      const pages = Math.max(Math.ceil(total / limit), 1);
      return res.view('contact/index', { contacts, q, page, pages, total, limit });

    } catch (e) {
      sails.log.error(e);
      return res.serverError(e);
    }
  },

  // Render form for new
  new: async function (req, res) {
    return res.view('contact/new', { contact: {}, errors: [] });
  },

  // Create with validation
  create: async function (req, res) {
    const { firstName, lastName, email, phone, notes } = req.allParams();
    const errors = [];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!firstName || !firstName.trim()) errors.push({ field: 'firstName', message: 'First name is required' });
    if (!lastName || !lastName.trim())   errors.push({ field: 'lastName',  message: 'Last name is required' });
    if (!email || !emailRegex.test(email)) errors.push({ field: 'email', message: 'A valid email is required' });
    if (phone && phone.length > 40) errors.push({ field: 'phone', message: 'Phone is too long' });
    if (notes && notes.length > 1000) errors.push({ field: 'notes', message: 'Notes is too long' });

    if (errors.length) {
      return res.status(422).view('contact/new', { contact: { firstName, lastName, email, phone, notes }, errors });
    }

    try {
      await Contact.create({ firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim(), phone: phone || null, notes: notes || null });
      return res.redirect('/contacts');
    } catch (e) {
      if (e.code === 'E_UNIQUE') {
        return res.status(422).view('contact/new', {
          contact: { firstName, lastName, email, phone, notes },
          errors: [{ field: 'email', message: 'Email already exists' }]
        });
      }
      sails.log.error(e);
      return res.serverError(e);
    }
  },

  // Show one
  show: async function (req, res) {
    const id = Number(req.param('id'));
    const contact = await Contact.findOne({ id });
    if (!contact) return res.notFound();
    return res.view('contact/show', { contact });
  },

  // Edit form
  edit: async function (req, res) {
    const id = Number(req.param('id'));
    const contact = await Contact.findOne({ id });
    if (!contact) return res.notFound();
    return res.view('contact/edit', { contact, errors: [] });
  },

  // Update with validation
  update: async function (req, res) {
    const id = Number(req.param('id'));
    const { firstName, lastName, email, phone, notes } = req.allParams();
    const errors = [];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!firstName || !firstName.trim()) errors.push({ field: 'firstName', message: 'First name is required' });
    if (!lastName || !lastName.trim())   errors.push({ field: 'lastName',  message: 'Last name is required' });
    if (!email || !emailRegex.test(email)) errors.push({ field: 'email', message: 'A valid email is required' });
    if (phone && phone.length > 40) errors.push({ field: 'phone', message: 'Phone is too long' });
    if (notes && notes.length > 1000) errors.push({ field: 'notes', message: 'Notes is too long' });

    if (errors.length) {
      return res.status(422).view('contact/edit', { contact: { id, firstName, lastName, email, phone, notes }, errors });
    }

    try {
      await Contact.updateOne({ id }).set({ firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim(), phone: phone || null, notes: notes || null });
      return res.redirect(`/contacts/${id}`);
    } catch (e) {
      if (e.code === 'E_UNIQUE') {
        return res.status(422).view('contact/edit', {
          contact: { id, firstName, lastName, email, phone, notes },
          errors: [{ field: 'email', message: 'Email already exists' }]
        });
      }
      sails.log.error(e);
      return res.serverError(e);
    }
  },

  // Delete
  destroy: async function (req, res) {
    const id = Number(req.param('id'));
    await Contact.destroyOne({ id });
    return res.redirect('/contacts');
  }
};
