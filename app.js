
const sails = require('sails');
sails.lift({}, (err) => {
  if (err) {
    console.error('Failed to lift Sails:', err);
    process.exit(1);
  }
});
