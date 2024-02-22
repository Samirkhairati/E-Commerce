import { BsCloudUpload } from "react-icons/bs";

const NewCategory = () => {
    return (
        <>
            <section className="container w-full mx-auto flex items-center justify-center py-32">
                <div className="max-w-sm mx-aut shadow-md overflow-hidden items-center border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-800  dark:border-gray-600 dark:hover:border-gray-500 ">
                    <div className="px-4 py-6">
                        <div id="image-preview" className="max-w-sm p-6 mb-4 bg-gray-100 dark:bg-gray-700 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer ">
                            <input id="upload" type="file" className="hidden" accept="image/*" />
                            <label for="upload" className="cursor-pointer">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8 text-gray-700 mx-auto mb-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                </svg> */}
                                <BsCloudUpload className="w-8 h-8 text-blue-200 mx-auto mb-4" />

                                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-200">Upload picture</h5>
                                <p className="font-normal text-sm text-gray-400 md:px-6">Choose photo size should be less than <b className="text-blue-200">2mb</b></p>
                                <p className="font-normal text-sm text-gray-400 md:px-6">and should be in <b className="text-blue-200">JPG, PNG, or GIF</b> format.</p>
                                <span id="filename" className="text-bl-500 bg-gray-200 z-50"></span>
                            </label>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="w-full">
                                <label className="w-full text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 mb-2 cursor-pointer">
                                    <span className="text-center ml-2">Upload</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default NewCategory;
