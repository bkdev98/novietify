import mongoose, { Schema } from 'mongoose';

const MovieSchema = new Schema(
  {
    id: {
      type: String,
      required: [true, 'ID yêu cầu bắt buộc'],
      unique: [true, 'ID đã bị trùng'],
    },
    slug: {
      type: String,
      required: [true, 'Slug yêu cầu bắt buộc'],
      unique: [true, 'Slug đã bị trùng'],
    },
    name: {
      type: String,
      required: [true, 'Name yêu cầu bắt buộc'],
    },
    imageLandscape: String,
    imagePortrait: String,
    imageLandscapeMobile: String,
    allowBooking: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

MovieSchema.methods = {
  toJSON() {
    return {
      id: this.id,
      slug: this.slug,
      name: this.name,
      imageLandscape: this.imageLandscape,
      imagePortrait: this.imagePortrait,
      imageLandscapeMobile: this.imageLandscapeMobile,
      allowBooking: this.allowBooking,
      createdAt: this.createdAt,
    };
  },
};

export default mongoose.model('Movie', MovieSchema);
