import { FaRegEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";


const UserRow = (props) => {
    return (
        <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
            <td className="whitespace-nowrap p-4 font-medium text-gray-900 dark:text-slate-500 bg-slate font-mono text-sm ">{props.no}</td>
            <td className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4">
                <img className="h-10 w-10 rounded-full object-cover" src={`${props.image || 'https://res.cloudinary.com/dkytadhg9/image/upload/v1708770896/uafdn2h4erwsqjjdruyp.png'}`} alt="" />
                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    <Link to={`/product/${props.productId}`} className="text-base font-semibold text-gray-900 dark:text-white hover:underline">{props.name}</Link>
                </div>
            </td>
            <td className="whitespace-nowrap p-4 font-medium text-gray-900 dark:text-slate-500 bg-slate font-mono text-sm ">{props.category}</td>
            <td className="whitespace-nowrap p-4 font-medium text-gray-900 dark:text-slate-500 bg-slate font-mono text-sm ">{props.productId}</td>
            <td className="whitespace-nowrap p-4 font-medium text-gray-900 dark:text-slate-500 bg-slate font-mono text-sm ">₹{Math.round(props.price)}</td>
            <td className="whitespace-nowrap p-4 font-medium text-gray-900 dark:text-slate-500 bg-slate font-mono text-sm ">₹{Math.round(props.price * (1 - props.discount/100))}</td>
            <td className="whitespace-nowrap p-4 font-medium text-gray-900 dark:text-slate-500 bg-slate font-mono text-sm ">{props.stock}</td>
            <td className="whitespace-nowrap p-4 font-medium text-gray-900 dark:text-slate-500 bg-slate font-mono text-sm ">{props.sold}</td>
            
            <td className="space-x-2 whitespace-nowrap p-4">
                <button onClick={props.editButton} type="button" data-modal-target="edit-user-modal" data-modal-toggle="edit-user-modal" className="bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center rounded-lg px-3 py-2 text-center text-sm font-medium text-white focus:ring-4">
                    <FaRegEdit className="mr-2 h-4 w-4" />
                    Edit product
                </button>
                <button onClick={props.deleteButton} type="button" data-modal-target="delete-user-modal" data-modal-toggle="delete-user-modal" className={`inline-flex items-center rounded-lg ${props.admin === true ? 'cursor-not-allowed bg-red-900 text-red-700' : 'bg-red-600 text-white hover:bg-red-800'} px-3 py-2 text-center text-sm font-medium   focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900`}>
                    <FaTrash className="mr-2 h-4 w-4" />
                    Delete product
                </button>
            </td>
        </tr>
    );
};

export default UserRow;

