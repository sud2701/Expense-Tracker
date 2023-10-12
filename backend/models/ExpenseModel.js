import mongoose from 'mongoose';

const schema = mongoose.Schema;

const expenseSchema = new schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    date_recorded: {
        type: Date,
        required: true,
    },
    user_name: {
        type: String,
        required: true,
    }
})

const Expense = mongoose.model("Expense", expenseSchema);
export { Expense };