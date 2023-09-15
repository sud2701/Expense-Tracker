const mongoose = require('mongoose');

const schema = mongoose.Schema;

const incomeSchema = new schema({
    source: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date_recorded: {
        type: Date,
        required: true
    },
    user_name: {
        type: String,
        required: true
    }
});

const Income = mongoose.model("Income", incomeSchema);
module.exports = { Income };