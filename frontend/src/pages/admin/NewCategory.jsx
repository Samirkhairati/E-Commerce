import { BsCloudUpload } from "react-icons/bs";
import { useState } from "react";

const NewCategory = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewURL, setPreviewURL] = useState(null);

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('submit');
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewURL(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setSelectedFile(null);
            setPreviewURL(null);
        }
    };

    return (
        <>
            <section className="container w-full mx-auto flex items-center justify-center py-32">
                <form>

                    <div className="max-w-sm mx-aut shadow-md overflow-hidden items-center border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-800  dark:border-gray-600 dark:hover:border-gray-500 ">
                        <div className="px-4 py-4">
                            <h3 className="mt-4 mb-6 flex justify-center text-xl font-semibold dark:text-white">New Category</h3>

                            <input type="text" name="username" id="name" className="my-4 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder={"Category Name"} value={''} onChange={''} />

                            <div id="image-preview" className="max-w-sm p-6 mb-4 bg-gray-100 dark:bg-gray-700 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer ">

                                {
                                    selectedFile
                                        ? <img src={previewURL} className="max-h-48 rounded-lg mx-auto" alt="Image preview" />
                                        : <>
                                            <input onChange={handleFileChange} id="upload" type="file" className="hidden" accept="image/*" />
                                            <label htmlFor="upload" className="cursor-pointer">
                                                <BsCloudUpload className="w-8 h-8 text-blue-200 mx-auto mb-4" />
                                                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-200">Upload picture</h5>
                                                <p className="font-normal text-sm text-gray-400 md:px-6">Choose photo size should be less than <b className="text-blue-200">2mb</b></p>
                                                <p className="font-normal text-sm text-gray-400 md:px-6">and should be in <b className="text-blue-200">JPG, PNG, or GIF</b> format.</p>
                                            </label>
                                        </>
                                }
                            </div>
                            <div className="flex items-center justify-center">
                                <button type="submit" className="w-full">
                                    <label className="w-full text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 cursor-pointer">
                                        <span className="text-center ml-2">Upload</span>
                                    </label>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

            </section>

        </>
    );
};

export default NewCategory;

