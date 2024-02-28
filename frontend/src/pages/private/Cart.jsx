import React from 'react';

const Cart = () => {
    return (
        <>
            <div className="w-full py-10 px-10">
                <div class="rounded-lg flex h-full flex-col overflow-y-scroll bg-white shadow-xl dark:bg-gray-800 dark:text-white">
                    <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div class="flex items-start justify-between">
                            <h2 class="text-lg font-medium text-gray-900 dark:text-white" id="slide-over-title">Shopping cart</h2>
                        </div>
                        <div class="mt-8">
                            <ul role="list" class="-my-6 divide-y divide-gray-200 dark:divide-gray-600">
                                <li class="flex py-6">
                                    <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                                        <img src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg" class="h-full w-full object-cover object-center" />
                                    </div>

                                    <div class="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div class="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                                <h3>
                                                    <a href="#">Throwback Hip Bag</a>
                                                </h3>
                                                <p class="ml-4">$90.00</p>
                                            </div>
                                        </div>
                                        <div class="flex flex-1 items-end justify-between text-sm">
                                            <p class="text-gray-500 dark:text-gray-400">Qty 1</p>

                                            <div class="flex">
                                                <button type="button" class="font-medium text-rose-600 hover:text-rose-700 dark:text-rose-400">Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                
                            </ul>
                        </div>
                    </div>

                    <div class=" px-4 py-6 sm:px-6">
                        <div class="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                            <p>Subtotal</p>
                            <p>$262.00</p>
                        </div>
                        <div class="mt-6">
                            <button onClick="#" class="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700">Proceed to Checkout</button>
                        </div>
                        <div class="mt-6">
                            <button onClick="#" class="flex w-full items-center justify-center rounded-md border border-transparent bg-rose-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-rose-700">Clear Cart</button>
                        </div>
                    </div>
                </div>

            </div>


        </>
    );
};

export default Cart;
