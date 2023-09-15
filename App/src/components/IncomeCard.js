import { formatDate } from "../utils/functions";
const IncomeCard = ({ income, onClick }) => {
    const { date_recorded, source, amount } = income;
    return (

        <div onClick={() => onClick(income)} className="bg-white hover:bg-gray-100 border border-gray-300 my-0 rounded-lg p-4 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 flex flex-row items-center w-10/12 h-min">
            <p className="text-lg mx-12 font-semibold">{source}</p>
            <p className="text-gray-500 mx-12">${amount}</p>
            <p className="text-xs mx-12 text-gray-500">{formatDate(date_recorded)}</p>
        </div>


    );
};

export default IncomeCard;