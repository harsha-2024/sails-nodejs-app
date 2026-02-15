
module.exports.bootstrap = async function() {
  try {
    // seed users only if none
    const userCount = await User.count();
    if (userCount === 0) {
      const bcrypt = require('bcryptjs');
      const hash = await bcrypt.hash('password', 10);
      await User.create({ fullName: 'Demo User', email: 'demo@example.com', passwordHash: hash });
      sails.log('Seeded demo user: demo@example.com / password');
    }

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
