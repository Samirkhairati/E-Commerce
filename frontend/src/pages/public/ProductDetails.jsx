import { useParams } from 'react-router';
import { useGetProductDetailsQuery } from '../../actions/api/productsApiSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../actions/reducers/cartSlice';
import { toast } from 'react-toastify';
import { useReadCategoriesQuery } from '../../actions/api/categoriesApiSlice';

const ProductDetails = () => {
    const { id } = useParams();
    const { data: product, error, isLoading } = useGetProductDetailsQuery(id);
    const {data: category, categoryIsLoading} = useReadCategoriesQuery(!isLoading ? product.category : '');
    const [defaultImage, setDefaultImage] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const dispatch = useDispatch();
    const addToCartButton = () => {
        dispatch(addToCart({
            productId: product.productId,
            product: product
        }))
        toast.success('Product added to cart')
    }


    useEffect(() => {
        //console.log(!isLoading ? product : 'Loading')
        console.log(!categoryIsLoading ? category : 'Loading')
        setDefaultImage(!isLoading ? product.image[0] : '');
        setSelectedImage(!isLoading ? product.image[0] : '')
    }, [product, category])
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
                :
                
                <div className="w-full p-10">
                    <div className='p-10 shadow-lg dark:bg-gray-800 bg-gray-100 rounded-2xl flex flex-col md:flex-row md:items-center justify-center'>
                        <div className="w-full md:w-1/2 my-5 md:mr-10">

                            <div className="grid gap-4">
                                <div>
                                    <img className="h-auto max-w-full rounded-lg" src={selectedImage} alt="" />
                                </div>
                                <div className="grid grid-cols-5 gap-4">
                                    <div>
                                        <img className="cursor-pointer h-auto max-w-full rounded-lg" src={defaultImage} onClick={(e) => { setSelectedImage(e.target.src) }} />
                                    </div>
                                    <div>
                                        <img className="cursor-pointer h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" onClick={(e) => { setSelectedImage(e.target.src) }} />
                                    </div>
                                    <div>
                                        <img className="cursor-pointer h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" onClick={(e) => { setSelectedImage(e.target.src) }} />
                                    </div>
                                    <div>
                                        <img className="cursor-pointer h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" onClick={(e) => { setSelectedImage(e.target.src) }} />
                                    </div>
                                    <div>
                                        <img className="cursor-pointer h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" onClick={(e) => { setSelectedImage(e.target.src) }} />
                                    </div>


                                </div>
                            </div>



                        </div>
                        <div className='flex flex-col md:w-1/2  sm:mt-5 sm:w-full md:justify-center'>
                            <h1 className='text-3xl font-bold dark:text-gray-500 text-black mb-2'>Product</h1>
                            <h1 className='text-5xl font-bold dark:text-white text-black mb-6'>{product.name}</h1>
                            <p className='text-4xl font-bold text-white mb-5'><span className='text-blue-400 mr-2'>₹{Math.round(product.price * (1 - product.discount / 100))}</span><span className='text-3xl line-through text-gray-500'>₹{product.price}</span></p>
                            <p className='text-lg text-gray-400 mb-5'>{product.description} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet voluptatum excepturi assumenda ducimus! Dicta cum tenetur nostrum corporis minima vel amet esse aspernatur? Suscipit sint corrupti quasi aliquam unde commodi.</p>
                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                onClick={addToCartButton}
                            >
                                Add to Cart
                                {/* <input type='number' value={quantity} onChange={(e) => { setQuantity(e.target.value) }} className='w-14 ml-6 text-gray-500 p-1 pl-3 rounded-md bg-slate-700'></input> */}
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>


    );
};

export default ProductDetails;