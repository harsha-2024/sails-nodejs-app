
/**
 * config/bootstrap.js
 * Seed a couple of contacts on first lift (dev only)
 */
module.exports.bootstrap = async function() {
  try {
    const count = await Contact.count();
    if (count === 0) {
      await Contact.createEach([
        { firstName: 'Ada', lastName: 'Lovelace', email: 'ada@example.com', phone: '555-1001', notes: 'Pioneer' },
        { firstName: 'Alan', lastName: 'Turing',   email: 'alan@example.com', phone: '555-1002', notes: 'Computability' }
      ]);
      sails.log('Seeded 2 contacts');
    }
  } catch (e) {
    sails.log.warn('Bootstrap seed skipped:', e.message);
  }
};
