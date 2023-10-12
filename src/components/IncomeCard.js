import { formatDate } from "../utils/functions";
import { handleIncomeDelete } from "../pages/IncomeTable";
const IncomeCard = ({ income, onClick }) => {
    const { date_recorded, source, amount } = income;
    return (

        <div onClick={() => onClick(income)} className="bg-white hover:bg-gray-100 border border-black my-0 py-3 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 grid grid-cols-9 place-items-center w-10/12 h-min">
            <p className="text-lg mx-12 font-semibold col-span-3">{source}</p>
            <p className="text-gray-500 mx-12 col-span-2">${amount}</p>
            <p className="text-xs mx-12 text-gray-500 col-span-3">{formatDate(date_recorded)}</p>
            <button onClick={() => { handleIncomeDelete(income._id) }} className="flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </button>
        </div>


    );
};

export default IncomeCard;