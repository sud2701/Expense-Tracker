import mongoose from 'mongoose';
const schema = mongoose.Schema;

const subscriptionSchema = new schema({
    name: {
        type: String,
        required: true,
        validate: [(s) => { return s.length > 0 }, "Use a valid name for the subscription"]
    },
    repeats: {
        type: String,
        required: true,
        enum: {
            values: ["Week", "Month", "Year"],
            message: "Invalid Repetition"
        }
    },
    amount: {
        type: Number,
        required: true,
        validate: [(n) => { return n > 0; }, "Subscription Amount should be greater than zero"]
    },
    begins_On: {
        type: Date,
        required: true
    },
    expires_On: {
        type: Date,
        required: true,
    },
    username: {
        type: String,
        required: true
    }
})

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export { Subscription };