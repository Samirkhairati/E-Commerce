import ProductCard from "../../components/ProductCard";
import SearchBar from "../../components/SearchBar";
import { useGetProductsQuery } from "../../actions/api/productsApiSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { current } from "@reduxjs/toolkit";

const Shop = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const { data: products, refetch, isLoading, isError } = useGetProductsQuery({ keyword: {}, page: currentPage });
    useEffect(() => {
        refetch()
        console.log(isLoading ? '' : products.pages)
    }, [refetch, products])
    return (
        <>

            {isLoading ?
                <div className="text-white">
                    <div className="w-full h-96 flex items-center justify-center">
                        <svg aria-hidden="true" className="w-20 h-20 text-gray-200 animate-spin dark:text-blue-300 fill-blue-100" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>

                    </div>
                </div>
                : isError ? <div>{toast.error(JSON.stringify(isError.data))}</div>
                    :
                    <>
                        <div className="pt-10 px-1">
                            <SearchBar />
                            <section className="p-1 mt-3 w-full flex flex-wrap flex-row items-center justify-center">
                                {products.products.map((product, index) => {
                                    return <ProductCard key={index} name={product.name} image={product.image} price={product.price} rating={product.rating} />
                                })}
                            </section>
                            <nav className="w-full flex flex-row items-center justify-center mt-2 mb-5">
                                <ul className="flex items-center -space-x-px h-10 text-base">
                                    <li>
                                        <button onClick={() => { 1 === products.page ? setCurrentPage(currentPage) : setCurrentPage(currentPage - 1) }} className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <IoIosArrowBack className="w-4 h-4  rtl:rotate-180" />
                                        </button>
                                    </li>
                                    {Array.from({ length: products.pages }, (_, i) => (
                                        <li key={i}>
                                            <button onClick={() => { setCurrentPage(i + 1) }} className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 ${products.page === i + 1 ? 'bg-gray-100 text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white' : 'hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}>
                                                {i + 1}
                                            </button>
                                        </li>
                                    ))}


                                    <li>
                                        <button onClick={() => { products.pages === products.page ? setCurrentPage(currentPage) : setCurrentPage(currentPage + 1) }} className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                            <IoIosArrowForward className="w-4 h-4  rtl:rotate-180" />
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                    </>


            }



        </>
    );
};

export default Shop;
