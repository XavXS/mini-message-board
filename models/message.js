const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const { DateTime } = require('luxon');

const MessageSchema = new Schema({
    author: { type: String, required: true, minLength: 1, maxLength: 16 },
    content: { type: String, required: true, minLength: 1, maxLength: 300 },
    date: {type: Date, required: true},
});

MessageSchema.virtual('date_formatted').get(function() {
    return this.date? DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATETIME_SHORT) : 'N/A';
})

module.exports = mongoose.model('Message', MessageSchema);