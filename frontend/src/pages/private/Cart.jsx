import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useGetProductDetailsQuery } from "../../actions/api/productsApiSlice";
import { removeFromCart, clearCartItems } from "../../actions/reducers/cartSlice";
import { useEffect, useState } from "react";
import { useCreateOrderMutation } from "../../actions/api/ordersApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {

    const { userInfo } = useSelector(state => state.auth)
    const { cartItems, itemsPrice } = useSelector(state => state.cart)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [remove, setRemove] = useState()
    const removeHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    const clearHandler = () => {
        dispatch(clearCartItems())
    }

    const [address, setAddress] = useState('')
    const [createOrder] = useCreateOrderMutation()

    const orderItems = cartItems.map((item) => {
        return {
            product: item._id,
            qty: item.quantity
        }
    })

    const checkout = async () => {
        if (orderItems.length === 0) {
            toast.error("Cart is empty")
            return
        }
        try {
            await createOrder({
                user: userInfo._id,
                orderItems: orderItems, 
                shippingAddress: address, 
                totalPrice: itemsPrice
            })
            toast.success("Order placed successfully")
            clearHandler()
            navigate('/me/orders')
        } catch (error) {
            toast.error("Error placing order")
        }
        
    }

useEffect(() => {
    if (cartItems.length > 0) {
        console.log(cartItems[0]);
    }
}, [cartItems]);
    

    return (
        <>
            <div className="w-full py-10 px-10">
                <div className="rounded-lg flex h-full flex-col overflow-y-scroll bg-white shadow-xl dark:bg-gray-800 dark:text-white">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-white" id="slide-over-title">Shopping cart</h2>
                        </div>
                        <div className="mt-8">
                            <ul role="list" className="-my-6 divide-y divide-gray-200 dark:divide-gray-600">

                                { cartItems.length === 0 ? <h1 className="text-3xl text-gray-500 mt-10">Cart is empty</h1> :
                                    cartItems.map((item, index) => {
                                        
                                        return ( 
                                            <li key={index} className="flex py-6">
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                                                    <img src={item.product.image[0]} className="h-full w-full object-cover object-center" />
                                                </div>

                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                                            <h3>
                                                                <Link to={`/product/${item._id.toString()}`}>{item.product.name}</Link>
                                                            </h3>
                                                            <p className="ml-4">₹{Math.round(item.product.price * (1 - item.product.discount/100))}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                        <p className="text-gray-500 dark:text-gray-400">Qty {item.quantity}</p>

                                                        <div className="flex">
                                                            <button onClick={() => {removeHandler(item._id)}} type="button" className="font-medium text-rose-600 hover:text-rose-700 dark:text-rose-400">Remove</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                }


                            </ul>
                        </div>
                    </div>

                    <div className=" px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                            <p>Subtotal</p>
                            <p>₹{Math.round(itemsPrice) || 0}</p>
                        </div>
                        <input value={address} onChange={(e) => {setAddress(e.target.value)}} type="text" className="mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your address" />
                        <div className="mt-6">
                            <button onClick={checkout} className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700">Place Order</button>
                        </div>
                        <div className="mt-6">
                            <button onClick={clearHandler} className="flex w-full items-center justify-center rounded-md border border-transparent bg-rose-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-rose-700">Clear Cart</button>
                        </div>
                    </div>
                </div>

            </div>


        </>
    );
};

export default Cart;
