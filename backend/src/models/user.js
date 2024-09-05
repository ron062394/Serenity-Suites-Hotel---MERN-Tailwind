const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'manager', 'staff'], default: 'staff' },
  canAddUser: { type: Boolean, default: false },
});

// Set canAddUser to true for admin
userSchema.pre('save', function(next) {
  if (this.role === 'admin') {
    this.canAddUser = true;
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
