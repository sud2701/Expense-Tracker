import { connect } from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import pkg from 'validator';
const { isEmail, isStrongPassword } = pkg;
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
const URI = process.env.URI;
const PORT = process.env.PORT || 4000;
const app = express();
import { User } from './models/UserModel.js';
import { Expense } from './models/ExpenseModel.js';
import { Income } from './models/IncomeModel.js';
import { Goal } from "./models/GoalModel.js";
import { Subscription } from "./models/SubscriptionModel.js";
import cors from 'cors';
const SIGN = process.env.SIGN;
const corsOptions = {
    origin: true,
    credentials: true
}



connect(URI)
    .then(() => {
        app.listen(PORT);
        console.log("Connected to the database");
        console.log(`Running on port ${PORT}`);
    }).catch((err) => {
        console.log(err);
    })

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.get("/expenses", async (req, res) => {
    try {
        const username = req.query.username;
        const page = req.query.page;
        const limit = req.query.limit;
        const offset = page > 0 ? (page - 1) * limit : 0;
        let expenses = await Expense.find({ user_name: username }).sort({ date_recorded: -1 }).skip(offset).limit(limit);
        if (expenses.length > 0) {
            res.status(200).json(expenses);
        }
        else {
            res.status(202).json({ msg: "No expenses to show" });
        }
    } catch (err) {
        res.status(400).json("Unable to fetch expenses");
    }
});

app.get("/incomes", async (req, res) => {
    try {
        const username = req.query.username;
        const page = req.query.page;
        const limit = req.query.limit;
        const offset = (page > 0) ? (page - 1) * limit : 0;
        const incomes = await Income.find({ user_name: username }).sort({ date_recorded: -1 }).skip(offset).limit(limit);
        if (incomes.length > 0) {
            res.status(200).json(incomes);
        }
        else {
            res.status(202).json({ msg: "No incomes to show" });
        }
    } catch (err) {
        res.status(400).json("Unable to fetch incomes");
    }
}
);

app.post("/expenses", async (req, res) => {
    const { title, description, amount, category, username } = req.body;
    let date = new Date();
    let new_expense;
    if (description) {
        new_expense = await Expense.create({ title, description, amount, category, date_recorded: date, user_name: username });
    }
    else {
        new_expense = await Expense.create({ title, amount, category, date_recorded: rec_date, user_name: username });
    }
    if (new_expense) {
        res.status(201).send({ msg: "Expense added" });
    }
    else {
        res.status(400).send({ error: "Expense couldn't be added" });
    }
}
);

app.post("/incomes", async (req, res) => {
    const { source, amount, username } = req.body;
    let date = new Date();
    const new_income = await Income.create({ source, amount, date_recorded: date, user_name: username });
    if (new_income) {
        res.status(201).send({ msg: "Income Added" });
    }
    else {
        res.status(400).send({ error: "Unable to add income" });
    }
}
);

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.login(username, password);
        res.status(200).json({ firstname: user.firstname, lastname: user.lastname, email: user.email, username: user.username });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }

})

app.post("/signup", async (req, res) => {
    const { firstname, lastname, email, username, password } = req.body;
    let email_check = isEmail(email);
    if (!email_check) {
        res.status(400).send({ error: "Invalid Email Address" });
    }
    else {
        email_check = await User.findOne({ email: email });
        if (email_check) {
            res.status(400).send({ error: "An account already exists with the provided email" });
        }
        else {
            let username_check = await User.findOne({ username: username });
            if (username_check) {
                res.status(400).send({ error: "Username already exists" });
            }
            else {
                if (isStrongPassword(password)) {
                    const new_user = await User.create({ firstname: firstname, lastname: lastname, email: email, username: username, password: password });
                    if (new_user) {
                        res.status(200).send({ firstname, lastname, email, username });
                    }
                    else {
                        res.status(400).send({ error: "Registration failed, please try again" });
                    }
                }
                else {
                    res.status(400).send({ error: "Please choose a strong password" });
                }
            }
        }
    }
});

app.get("/expenses/month", async (req, res) => {
    const username = req.query.username;
    const month = req.query.month;
    const curr_year = new Date().getFullYear();
    try {
        const expenses = await Expense.find({
            user_name: username,
            $expr: {
                $and: [
                    { $eq: [{ $month: "$date_recorded" }, month] },
                    { $eq: [{ $year: "$date_recorded" }, curr_year] }
                ]
            }
        }).sort({ date_recorded: -1 });
        if (expenses.length > 0) {
            return res.status(200).json(expenses);
        }
        else {
            return res.status(202).json([]);
        }
    } catch (err) {
        return res.status(400).json("Unable to fetch this month's expenses");
    }
})

app.get("/incomes/month", async (req, res) => {
    const username = req.query.username;
    const month = req.query.month;
    const curr_year = new Date().getFullYear();
    try {
        const incomes = await Income.find({
            user_name: username,
            $expr: {
                $and: [
                    { $eq: [{ $month: "$date_recorded" }, month] },
                    { $eq: [{ $year: "$date_recorded" }, curr_year] }
                ]
            }
        }).sort({ date_recorded: -1 });
        if (incomes.length > 0) {
            return res.status(200).json(incomes);
        }
        else {
            return res.status(202).json([]);
        }
    } catch (err) {
        return res.status(400).json("Unable to fetch this month's incomes");
    }
})

app.get("/expenses/year", async (req, res) => {
    const username = req.query.username;
    const year = req.query.year;
    const page = req.query.page;
    const limit = req.query.limit;
    try {
        const offset = page > 0 ? (page - 1) * limit : 0;
        const expenses = await Expense.find({
            user_name: username,
            $expr: {
                $eq: [{ $year: "$date_recorded" }, year]
            }
        }).sort({ date_recorded: -1 }).skip(offset).limit(limit);
        if (expenses.length > 0) {
            return res.status(200).json(expenses);
        }
        else {
            return res.status(202).json([]);
        }
    } catch (err) {
        return res.status(400).json("Unable to fetch this year's expenses");
    }
})

app.get("/incomes/year", async (req, res) => {
    const username = req.query.username;
    const year = req.query.year;
    const page = req.query.page;
    const limit = req.query.limit;
    try {
        const offset = page > 0 ? (page - 1) * limit : 0;
        const incomes = await Income.find({
            user_name: username,
            $expr: {
                $eq: [{ $year: "$date_recorded" }, year]
            }
        }).sort({ date_recorded: -1 }).skip(offset).limit(limit);
        if (incomes.length > 0) {
            return res.status(200).json(incomes);
        }
        else {
            return res.status(202).json([]);
        }
    } catch (err) {
        return res.status(400).json("Unable to fetch this year's incomes");
    }
});

app.get("/dashboard", async (req, res) => {
    try {
        const date = new Date();
        const username = req.query.username;
        const recent_expenses = await Expense.find({ user_name: username }).sort({ date_recorded: -1 }).limit(5);
        const recent_incomes = await Income.find({ user_name: username }).sort({ date_recorded: -1 }).limit(5);
        const this_expenses = await Expense.aggregate([
            {

                $match: {
                    user_name: username,
                    $expr: {
                        $and: [
                            { $eq: [{ $month: "$date_recorded" }, date.getMonth() + 1] },
                            { $eq: [{ $year: "$date_recorded" }, date.getFullYear()] }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" }
                }
            }

        ]);

        const this_incomes = await Income.aggregate([
            {

                $match: {
                    user_name: username,
                    $expr: {
                        $and: [
                            { $eq: [{ $month: "$date_recorded" }, date.getMonth() + 1] },
                            { $eq: [{ $year: "$date_recorded" }, date.getFullYear()] }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" }
                }
            }

        ]);
        const last_expenses = await Expense.aggregate([
            {

                $match: {
                    user_name: username,
                    $expr: {
                        $and: [
                            { $eq: [{ $month: "$date_recorded" }, date.getMonth()] },
                            { $eq: [{ $year: "$date_recorded" }, date.getFullYear()] }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" }
                }
            }

        ]);
        const last_incomes = await Income.aggregate([
            {

                $match: {
                    user_name: username,
                    $expr: {
                        $and: [
                            { $eq: [{ $month: "$date_recorded" }, date.getMonth()] },
                            { $eq: [{ $year: "$date_recorded" }, date.getFullYear()] }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" }
                }
            }

        ]);
        let this_expenses_total, this_incomes_total, last_expenses_total, last_incomes_total;
        this_expenses_total = calculate(this_expenses);
        this_incomes_total = calculate(this_incomes);
        last_expenses_total = calculate(last_expenses);
        last_incomes_total = calculate(last_incomes);
        return res.status(200).json({ recent_expenses, recent_incomes, this_expenses_total, this_incomes_total, last_expenses_total, last_incomes_total });
    }
    catch (err) {
        return res.status(400).json("Unable to load data");
    }

});

app.post("/goals", async (req, res) => {
    const { username, category, amount, begins_On, expires_On } = req.body;
    try {
        const new_goal = await Goal.create({ username, category, amount, begins_On, expires_On });
        if (new_goal) {
            return res.status(201).json("New Goal Successfully Created");
        }
        else {
            return res.status(400).json("Unable to create goal");
        }
    } catch (err) {
        return res.status(400).json("Goal creation failed");
    }
});

app.post("/subscriptions", async (req, res) => {
    const { username, name, repeats, amount, begins_On, expires_On } = req.body;
    try {
        const new_sub = await Subscription.create({ name, repeats, amount, begins_On, expires_On, username });
        if (new_sub) {
            return res.status(201).json("New Subscription created");
        }
        else {
            return res.status(500).json("Unable to create subscription");
        }
    } catch (err) {
        return res.status(500).json("Subsription creation failed");
    }
});

app.get("/goals", async (req, res) => {
    const username = req.query.username;
    let goals;
    const date = new Date();
    try {

        goals = await Goal.find({
            username: username,
            expires_On: { $gt: date },
            begins_On: { $lt: date }
        });
        return res.status(200).json(goals);

    }
    catch (err) {
        return res.status(400).json(err.message);
    }
});

app.get("/subscriptions", async (req, res) => {
    const username = req.query.username;
    const date = new Date();
    try {
        const subs = await Subscription.find({
            username: username,
            expires_On: { $gt: date },
            begins_On: { $lt: date }
        });

        return res.status(200).json(subs);

    } catch (err) {
        return res.status(400).json(err.message);
    }
})

app.get("/monthly-expense-aggregates", async (req, res) => {
    const username = req.query.username;
    const date = new Date();
    let month = date.getMonth();
    let year = date.getFullYear();
    let aggregates = [];
    for (let i = 0; i < 5; i++) {
        if (month < 0) {
            month = 11;
            year -= 1;
        }
        let agg = await Expense.aggregate([
            {
                $match: {
                    user_name: username,
                    $expr: {
                        $and: [
                            { $eq: [{ $month: "$date_recorded" }, month + 1] },
                            { $eq: [{ $year: "$date_recorded" }, year] }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" }
                }
            }

        ]);
        aggregates.push(agg);
        month--;
    }
    return res.status(200).json(aggregates);
})

app.get("/monthly-income-aggregates", async (req, res) => {
    const username = req.query.username;
    const date = new Date();
    let month = date.getMonth();
    let year = date.getFullYear();
    let aggregates = [];
    for (let i = 0; i < 5; i++) {
        if (month < 0) {
            month = 11;
            year -= 1;
        }
        let agg = await Income.aggregate([
            {

                $match: {
                    user_name: username,
                    $expr: {
                        $and: [
                            { $eq: [{ $month: "$date_recorded" }, month + 1] },
                            { $eq: [{ $year: "$date_recorded" }, year] }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" }
                }
            }

        ]);
        aggregates.push(agg);
        month--;
    }
    return res.status(200).json(aggregates);
})

app.delete("/expenses/:id", async (req, res) => {
    try {
        const expenseId = req.params.id;
        await Expense.findByIdAndDelete(expenseId);
        res.status(200).json("Expense deleted successfully");
    } catch (err) {
        res.status(400).json("Unable to delete selected expense");
    }
})

app.delete("/incomes/:id", async (req, res) => {
    try {
        const incomeId = req.params.id;
        await Income.findByIdAndDelete(incomeId);
        res.status(200).json("Income deleted successfully");
    } catch (err) {
        res.status(400).json("Unable to delete selected income");
    }
})

app.get("/life-expenses", async (req, res) => {
    const username = req.query.username;
    try {
        let agg = await Expense.aggregate([
            {
                $match: {
                    user_name: username,
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" }
                }
            }
        ]);

        return res.status(200).json(agg);
    } catch (err) {
        return res.status(400).json("Unable to find lifetime expenses");
    }

});

app.get("/life-incomes", async (req, res) => {
    const username = req.query.username;
    try {
        let agg = await Income.aggregate([
            {
                $match: {
                    user_name: username,
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" }
                }
            }
        ]);
        return res.status(200).json(agg);
    } catch (err) {
        return res.status(400).json("Unable to find lifetime incomes");
    }

});

const calculate = (values) => {
    if (values.length > 0) {
        return values[0].total;
    }
    else {
        return 0;
    }
}