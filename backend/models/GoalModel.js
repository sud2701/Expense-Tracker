import mongoose from 'mongoose';
const schema = mongoose.Schema;

const goalSchema = new schema({
    category: {
        type: String,
        required: true,
        enum: {
            values: ['Income', 'Expense', 'Subscription'],
            message: 'The given goal category is not supported'
        }
    },
    amount: {
        type: Number,
        required: true,
        validate: [(n) => { return n > 0; }, "Goal Amount should be greater than zero"]
    },
    username: {
        type: String,
        required: true
    },
    begins_On: {
        type: Date,
        required: true
    },
    expires_On: {
        type: Date,
        required: true
    }
})

const Goal = mongoose.model("Goal", goalSchema);

export { Goal };