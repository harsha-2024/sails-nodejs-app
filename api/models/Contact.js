
module.exports = {
  attributes: {
    firstName: { type: 'string', required: true, maxLength: 120 },
    lastName:  { type: 'string', required: true, maxLength: 120 },
    email:     { type: 'string', required: true, unique: true, maxLength: 254 },
    phone:     { type: 'string', allowNull: true, maxLength: 40 },
    notes:     { type: 'string', allowNull: true, maxLength: 1000 }
  }
};
