import { FaCross } from "react-icons/fa";

export default function Drawer(props) {

    return (
        <>
            <div id="drawer-example" className={`${props.open ? '-translate-x-full' : '-translate-x-0'} fixed z-50 top-0 left-0 h-screen p-4 overflow-y-auto transition-transform bg-white w-80 dark:bg-gray-800`} >
                <button onClick={props.drawerClose} type="button" data-drawer-hide="drawer-example" aria-controls="drawer-example" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
                    <FaCross className="w-3 h-3 md-20"></FaCross>
                </button>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos obcaecati reiciendis dignissimos placeat, non, numquam blanditiis quia ea voluptates id a iure architecto veritatis dolorem omnis necessitatibus. Recusandae, nisi ab.
                {props.children}
            </div>
            <div onClick={props.drawerClose} className={`backdrop-blur-sm w-screen h-screen fixed ${props.open ? 'hidden' : 'backdrop-blur-sm'}`}></div>
        </>
    );

}