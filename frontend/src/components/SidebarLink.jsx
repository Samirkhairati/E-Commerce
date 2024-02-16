import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";
const SidebarLink = (props) => {
    return (
        <>
            <li>
                <Link to={`${props.link}`}
                    className="relative flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <props.icon
                        className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                        {props.name}</span>
                    {props.admin === 'yes'
                        &&
                        <FaLock className="w-5 h-5 absolute right-2 p-[4px] text-blue-500 bg-blue-900 border-rad rounded-md" />}
                </Link>
            </li>
        </>
    );
};

export default SidebarLink;
