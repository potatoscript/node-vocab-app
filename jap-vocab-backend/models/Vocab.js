const mongoose = require('mongoose');

const vocabSchema = new mongoose.Schema({
    word: String,
    pronunciation: String,
    meaning: String,
    example: String,
    date_added:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Vocab', vocabSchema);