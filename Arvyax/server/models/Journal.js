import mongoose from 'mongoose';

const journalSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      index: true,
    },
    ambience: {
      type: String,
      enum: ['forest', 'ocean', 'mountain'],
      required: [true, 'Ambience is required'],
    },
    text: {
      type: String,
      required: [true, 'Journal text is required'],
      minlength: [10, 'Journal entry must be at least 10 characters'],
      maxlength: [5000, 'Journal entry must not exceed 5000 characters'],
    },
    emotion: {
      type: String,
      default: null,
    },
    keywords: {
      type: [String],
      default: [],
    },
    summary: {
      type: String,
      default: null,
    },
    analyzed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Journal = mongoose.model('Journal', journalSchema);

export default Journal;
