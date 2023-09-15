import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ expenses }) => {
    return (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {expenses.map((expense, index) => (
                <ExpenseItem key={index} expense={expense} />
            ))}
        </div>
    );
};

export default ExpenseList;
