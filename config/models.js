
/**
 * config/models.js
 * Global model settings
 */
module.exports.models = {
  migrate: 'alter', // auto-migrate in dev
  attributes: {
    id: { type: 'number', autoIncrement: true },
    createdAt: { type: 'number', autoCreatedAt: true },
    updatedAt: { type: 'number', autoUpdatedAt: true }
  }
};
