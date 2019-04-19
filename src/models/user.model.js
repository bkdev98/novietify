import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name yêu cầu bắt buộc'],
      minlength: [3, 'Name phải dài hơn hoặc bằng 3'],
      maxlength: [50, 'Name phải ngắng hơn hoặc bằng 50'],
    },
    email: {
      type: String,
      required: [true, 'Email yêu cầu bắt buộc'],
      unique: [true, 'Email is existed'],
      minlength: [5, 'Email phải dài hơn hoặc bằng 5'],
      maxlength: [50, 'Email phải ngắng hơn hoặc bằng 50'],
    },
    movies: [{ type: String, required: true }],
  },
  {
    timestamps: true,
  }
);

UserSchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      name: this.name,
      email: this.email,
      movies: this.movies,
      createdAt: this.createdAt,
    };
  },
};

export default mongoose.model('User', UserSchema);
