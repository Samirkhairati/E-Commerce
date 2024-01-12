import { useState } from "react";

import {
    AiOutlineHome,
    AiOutlineShopping,
    AiOutlineLogin,
    AiOutlineUserAdd,
    AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navigation = () => {

    const [dropDownMenu, setDropDownMenu] = useState(false);
    const [showSideBar, setShowSideBar] = useState(false);

    const toggleDropDownMenu = () => { setDropDownMenu(!dropDownMenu) };
    const toggleSideBar = () => { setShowSideBar(!showSideBar) };
    const closeSideBar = () => { setShowSideBar(false) };

    return (
        <>
            <div
                style={{ zIndex: 9999 }}
                className={`${showSideBar ? "hidden" : "flex"} xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-[#000] w-[4%] hover:w-[15%] h-[100vh]  fixed `}
                id="navigation-container">
                <div className="flex flex-col justify-center space-y-4">
                    <Link
                        to="/"
                        className="flex items-center transition-transform transform hover:translate-x-2">
                        <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
                        <span className="hidden nav-item-name mt-[3rem]">HOME</span>{" "}
                    </Link>

                    <Link
                        to="/shop"
                        className="flex items-center transition-transform transform hover:translate-x-2">
                        <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
                        <span className="hidden nav-item-name mt-[3rem]">SHOP</span>{" "}
                    </Link>

                    <Link to="/cart" className="flex relative">
                        <div className="flex items-center transition-transform transform hover:translate-x-2">
                            <AiOutlineShoppingCart className="mt-[3rem] mr-2" size={26} />
                            <span className="hidden nav-item-name mt-[3rem]">Cart</span>{" "}
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Navigation;
