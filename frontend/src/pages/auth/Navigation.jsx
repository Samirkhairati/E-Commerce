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


import { Button } from 'flowbite-react';


const Navigation = () => {

    const [dropDownMenu, setDropDownMenu] = useState(false);
    const [showSideBar, setShowSideBar] = useState(false);

    const toggleDropDownMenu = () => { setDropDownMenu(!dropDownMenu) };
    const toggleSideBar = () => { setShowSideBar(!showSideBar) };
    const closeSideBar = () => { setShowSideBar(false) };

    return (
        <>
            
        </>
    );
};

export default Navigation;
