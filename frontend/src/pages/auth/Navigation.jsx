import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiHome, HiHeart, HiShoppingCart, HiOutlineAdjustments } from 'react-icons/hi';
import { HiShoppingBag } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../actions/api/usersApiSlice";
import { logout } from "../../actions/reducers/authSlice";
import { toast } from "react-toastify";

const Navigation = () => {
    // React Hooks
    const [dropDownMenu, setDropDownMenu] = useState(false);
    const [showSideBar, setShowSideBar] = useState(false);
    const toggleDropDownMenu = () => { setDropDownMenu(!dropDownMenu) };
    const toggleSideBar = () => { setShowSideBar(!showSideBar); };

    //Redux
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {userInfo} = useSelector((state) => state.auth);

    const [logoutApiCall] = useLogoutMutation();
    const logoutHandler = async () => {
        try {
            await logoutApiCall();
            dispatch(logout());
            navigate("/login");
            toast.success("Logged out successfully");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button onClick={toggleSideBar} type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <Link to="/" className="flex ms-2 md:me-24">
                                <img src="/logo.svg" className="h-8 me-3" alt="FlowBite Logo" />
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Store</span>
                            </Link>
                        </div>
                        <div className="flex items-center">
                            { !userInfo ?
                                <Link to="/login" 
                                    className="bg-blue-600 inline-flex items-center w-full px-3 py-2 text-sm font-normal rounded-md text-white hover:bg-blue-700 hover:border-gray-300">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeWidth="2"
                                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                                    </svg>
                                    Login/Register
                                </Link>
                                :
                                <div className="flex items-center ms-3">
                                    <div>
                                        <button onClick={toggleDropDownMenu} type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                            <span className="sr-only">Open user menu</span>
                                            <img className="w-8 h-8 rounded-full" src="/profile.svg" alt="user photo"></img>
                                        </button>
                                    </div>

                                    <div className={`${dropDownMenu ? 'hidden' : 'absolute right-4 top-14'} z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`} id="dropdown-user">
                                        <div className="px-4 py-3" role="none">
                                            <p className="text-sm text-gray-900 dark:text-white" role="none">
                                                {userInfo?.username}
                                            </p>
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                                                {userInfo?.email}
                                            </p>
                                        </div>
                                        <ul className="py-1" role="none">
                                            {/* <li>
                                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a>
                                            </li>
                                            <li>
                                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                                            </li>
                                            <li>
                                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Earnings</a>
                                            </li> */}
                                            <li>
                                                <button onClick={logoutHandler} className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>}
                        </div>
                    </div>
                </div>
            </nav>



            <aside id="logo-sidebar" className={`${showSideBar ? 'translate-x-0' : '-translate-x-full'} sidebar-sizing      
                fixed top-0 left-0 z-40 w-48 h-screen pt-20 transition-transform ease-in-out bg-white border-r border-gray-700 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">`}>
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link
                                to="/"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <HiHome className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="ms-3">Home</span>{" "}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/shop"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <HiShoppingBag className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="ms-3">Shop</span>{" "}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/cart"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <HiShoppingCart className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="ms-3">Cart</span>{" "}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/favourites"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <HiHeart className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="ms-3">Favourites</span>{" "}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/profile"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <HiOutlineAdjustments className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="ms-3">Settings</span>{" "}
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>


        </>
    );
};

export default Navigation;
