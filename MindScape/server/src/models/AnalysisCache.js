const mongoose = require('mongoose');

const AnalysisCacheSchema = new mongoose.Schema({
    textHash: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
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
}, {
    timestamps: true
});

module.exports = mongoose.model('AnalysisCache', AnalysisCacheSchema);
