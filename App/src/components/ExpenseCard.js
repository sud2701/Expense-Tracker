import { formatDate } from "../utils/functions";
const ExpenseCard = ({ expense, onClick }) => {
    const { date_recorded, title, amount, category, description } = expense;
    return (

        <div onClick={() => onClick(expense)} className="bg-white hover:bg-gray-100 border border-gray-300 my-0 rounded-lg p-4 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 flex flex-row items-center w-10/12 h-min">
            <p className="text-lg mx-12 font-semibold">{title}</p>
            <p className="text-sm mx-12 text-gray-600">{description}</p>
            <p className="text-gray-500 mx-12">${amount}</p>
            <p className="text-xs mx-12 text-gray-500">{formatDate(date_recorded)}</p>
            <p className="text-xs mx-12 text-blue-500">{category}</p>
        </div>


    );
};

export default ExpenseCard;