import { toast } from "react-toastify";

const UserOrderCard = (props) => {

    return (
        <>
            <div className='p-4 dark:bg-slate-800 bg-gray-100 shadow-xl rounded-xl flex flex-col'>

                <div className="relative overflow-x-auto rounded-md mb-4">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Detail
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Info
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Status
                                </th>
                                <td className={`px-6 py-4 ${props.order.status === 'Pending' ? 'text-rose-400' : 'text-emerald-400'} `}>
                                    {props.order.status}
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Address
                                </th>
                                <td className="px-6 py-4">
                                    {props.order.shippingAddress}
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Name
                                </th>
                                <td className="px-6 py-4">
                                    {props.order.user.username}
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Ordered on
                                </th>
                                <td className="px-6 py-4">
                                    {props.order.createdAt}
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Total
                                </th>
                                <td className="px-6 py-4">
                                    ₹{Math.round(props.order.totalPrice)}
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                <div className="relative overflow-x-auto rounded-lg mb-4">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Product name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Quantity
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {props.order.orderItems.map((item, index) => {
                                return (<>
                                    { props.order.orderItems[index].product ? <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {props.order.orderItems[index].product.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {props.order.orderItems[index].qty}
                                        </td>
                                        <td className="px-6 py-4">
                                            ₹{Math.round(props.order.orderItems[index].product.price * props.order.orderItems[index].qty * (1 - props.order.orderItems[index].product.discount / 100))}
                                        </td>
                                    </tr> : <tr className="w-full pt-10 text-red-500">Product has been deleted</tr>}
                                </>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    );
};

export default UserOrderCard;
