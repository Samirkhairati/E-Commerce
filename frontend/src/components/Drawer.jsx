import { FaCross } from "react-icons/fa";

export default function Drawer(props) {

    return (
        <>
            <div id="drawer-example" className={`${props.open ? '-translate-x-full' : '-translate-x-0'} fixed z-50 top-0 left-0 h-screen p-4 overflow-y-auto transition-transform bg-white w-80 dark:bg-gray-800`} >
                {props.children}
            </div>
            <div onClick={props.drawerClose} className={`backdrop-blur-sm w-screen h-screen fixed ${props.open ? 'hidden' : 'backdrop-blur-sm'}`}></div>
        </>
    );

}