import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'You have to add a name'],
    },
    lastName: {
      type: String,
      required: [true, 'You have to add a lastName'],
    },
    email: {
      type: String,
      required: [true, 'You have to add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'You have to add a password'],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;
