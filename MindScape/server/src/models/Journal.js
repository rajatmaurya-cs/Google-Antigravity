const mongoose = require('mongoose');

const AnalysisSchema = new mongoose.Schema({
    emotion: {
        type: String,
        required: true
    },
    keywords: [{
        type: String
    }],
    summary: {
        type: String,
        required: true
    }
}, { _id: false });

const JournalSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'User ID is required'],
        index: true
    },
    ambience: {
        type: String,
        required: [true, 'Ambience is required'],
        enum: ['forest', 'ocean', 'mountain', 'blank']
    },
    text: {
        type: String,
        required: [true, 'Journal text is required']
    },
    analysis: {
        type: AnalysisSchema,
        default: null
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('Journal', JournalSchema);
