import { BsCloudUpload } from "react-icons/bs";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import { useUploadFileMutation } from "../../actions/api/uploadApiSlice";
import { useCreateCategoryMutation } from "../../actions/api/categoriesApiSlice";
import { toast } from "react-toastify";
import CategoryRow from "../../components/CategoryRow";

const NewCategory = () => {

    // GET Categories
    const { data: categories, refetch, getIsLoading, getError } = useGetUsersQuery();
    useEffect(() => {
        refetch();
    }, [refetch]);

    // CREATE Category 
    const [createCategoryName, setcreateCategoryName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewURL, setPreviewURL] = useState(null);
    const [imageURL, setImageURL] = useState('https://res.cloudinary.com/dkytadhg9/image/upload/v1708770896/uafdn2h4erwsqjjdruyp.png');
    const [fileIsLoading, setFileIsLoading] = useState(false);
    const [uploadFile] = useUploadFileMutation();
    const [createCategory, { isLoading }] = useCreateCategoryMutation();

    // EDIT Category

    // DELETE Category

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const result = await createCategory({ name: createCategoryName, image: imageURL }).unwrap();
            toast.success("Category created successfully: ");
        } catch (error) {
            toast.error("Couldn't create category: " + error + error?.data?.message || error.error)
        }
    }

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewURL(reader.result);
            };
            reader.readAsDataURL(file);
            try {
                setFileIsLoading(true);
                const result = await uploadFile(formData).unwrap();
                toast.success("Image uploaded successfully");
                setImageURL(result.url);
                setFileIsLoading(false);
            } catch (error) {
                setFileIsLoading(false);
                toast.error("Couldn't upload image: " + error?.data?.message || error.error);
            }
        } else {
            setFileIsLoading(false);
            setImageURL(null)
            setSelectedFile(null);
            setPreviewURL(null);
        }
    };

    return (
        <>
            <section className="container w-full mx-auto flex items-center justify-center py-32">
                <form onSubmit={submitHandler}>

                    <div className="max-w-sm mx-aut shadow-md overflow-hidden items-center border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-800  dark:border-gray-600 dark:hover:border-gray-500 ">
                        <div className="px-4 py-4">
                            <h3 className="mt-4 mb-6 flex justify-center text-xl font-semibold dark:text-white">New Category</h3>

                            <input type="text" name="name" id="name" className="my-4 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder={"Category Name"} value={createCategoryName} onChange={(e) => {setcreateCategoryName(e.target.value)}} />

                            <div id="image-preview" className="max-w-sm p-6 mb-4 bg-gray-100 dark:bg-gray-700 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer ">

                                {
                                    selectedFile
                                        ? <img src={previewURL} className="max-h-48 rounded-lg mx-auto" alt="Image preview" />
                                        : <>
                                            <input onChange={handleFileChange} id="upload" type="file" className="hidden" accept="image/*" name="file" />
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
                                <button disabled={fileIsLoading || isLoading} type="submit" className="w-full">
                                    <label className="w-full text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 cursor-pointer">
                                        <span className="text-center ml-2">{(fileIsLoading || isLoading ) && <Loader></Loader>}Create Category</span>
                                    </label>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

            </section>

            {/* <table className="min-w-full table-fixed divide-y divide-gray-200 dark:divide-gray-600">
                <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                        <th scope="col" className="p-4 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400">No.</th>
                        <th scope="col" className="p-4 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Name</th>
                        <th scope="col" className="p-4 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400">ID</th>
                        <th scope="col" className="p-4 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Admin</th>
                        <th scope="col" className="p-4 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                    {categories.map((category, index) => {
                        return (
                            <CategoryRow
                                editButton={() => handleEditButtonClick(category._id)}
                                deleteButton={() => handleDeleteButtonClick(category._id)}
                                no={index + 1} username={category.name} image={category.image} key={index} />
                        );
                    })}
                </tbody>
            </table> */}

        </>
    );
};

export default NewCategory;

