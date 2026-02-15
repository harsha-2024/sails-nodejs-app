
const bcrypt = require('bcryptjs');

module.exports = {
  attributes: {
    fullName: { type: 'string', required: true, maxLength: 120 },
    email: { type: 'string', required: true, unique: true, isEmail: true, maxLength: 254 },
    passwordHash: { type: 'string', required: true },

    // Omit passwordHash when converting to JSON
    toJSON: function() {
      const obj = this.toObject();
      delete obj.passwordHash;
      return obj;
    }
  },

  // Helper to check password (can be used elsewhere if needed)
  checkPassword: async function(password, hash) {
    return await bcrypt.compare(password, hash);
  }
};
