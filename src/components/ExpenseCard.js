import { formatDate } from "../utils/functions";
import { handleExpenseDelete } from "../pages/ExpenseTable";
const ExpenseCard = ({ expense, onClick }) => {
    const { date_recorded, title, amount, category, description } = expense;
    return (

        <div onClick={() => onClick(expense)} className="bg-white hover:bg-gray-100 border border-black py-3 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 grid grid-cols-10 items-center w-11/12 h-min place-items-center">
            <p className="text-lg mx-12 font-semibold col-span-2">{title}</p>
            <p className="text-sm mx-12 text-gray-600 col-span-2">{description}</p>
            <p className="text-gray-500 mx-12">${amount}</p>
            <p className="text-sm mx-12 text-gray-700 col-span-2">{formatDate(date_recorded)}</p>
            <p className="text-sm mx-12 text-blue-500">{category}</p>
            <button onClick={() => { handleExpenseDelete(expense._id) }} className="flex justify-center hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </button>

        </div>


    );
};

export default ExpenseCard;