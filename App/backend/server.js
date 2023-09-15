const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
const validator = require('validator');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const URI = process.env.URI;
const PORT = process.env.PORT || 4000;
const app = express();
const { User } = require('./models/UserModel');
const { Expense } = require('./models/ExpenseModel');
const { Income } = require('./models/IncomeModel');
const cors = require('cors');
const SIGN = process.env.SIGN;
const corsOptions = {
    origin: true,
    credentials: true
}


mongoose.connect(URI)
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
            res.status(200).json(expenses); // Send the array directly
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
        res.status(200).json({ msg: "Login Successful" });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }

})

app.post("/signup", async (req, res) => {
    const { firstname, lastname, email, username, password } = req.body;
    let email_check = validator.isEmail(email);
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
                if (validator.isStrongPassword(password)) {
                    const new_user = await User.create({ firstname: firstname, lastname: lastname, email: email, username: username, password: password });
                    if (new_user) {
                        res.status(200).send({ msg: "Login Successful" });
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
            return res.status(202).json("No expenses this month");
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
            return res.status(202).json("No incomes this month");
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
            return res.status(202).json("No expenses this year");
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
            return res.status(202).json("No incomes this year");
        }
    } catch (err) {
        return res.status(400).json("Unable to fetch this year's incomes");
    }
})