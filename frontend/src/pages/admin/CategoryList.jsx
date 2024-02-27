import { BsCloudUpload } from "react-icons/bs";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import { useUploadFileMutation } from "../../actions/api/uploadApiSlice";
import {
    useCreateCategoryMutation,
    useGetCategoriesQuery,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation
} from "../../actions/api/categoriesApiSlice";
import { toast } from "react-toastify";
import CategoryRow from "../../components/CategoryRow";
import Drawer from "../../components/Drawer";
import { FaPlus } from "react-icons/fa";

const NewCategory = () => {

    // GET Categories
    const { data: categories, refetch, isLoading: getIsLoading, getError } = useGetCategoriesQuery();

    // CREATE Category 
    const [createCategoryDrawer, toggleCreateCategoryDrawer] = useState(true);
    const [createCategoryName, setCreateCategoryName] = useState('');
    const [createSelectedFile, setCreateSelectedFile] = useState(null);
    const [createPreviewURL, setCreatePreviewURL] = useState(null);
    const [createImageURL, setCreateImageURL] = useState('https://res.cloudinary.com/dkytadhg9/image/upload/v1708770896/uafdn2h4erwsqjjdruyp.png');
    const [uploadFile, { isLoading: fileIsLoading }] = useUploadFileMutation();
    const [createCategory, { isLoading: createCategoryIsLoading }] = useCreateCategoryMutation();

    const createCategorySubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await createCategory({ name: createCategoryName, image: createImageURL }).unwrap();
            toast.success("Category created successfully: ");
            toggleCreateCategoryDrawer(!createCategoryDrawer);
            setCreateSelectedFile(null);
            setCreatePreviewURL(null);
            setCreateCategoryName('');
            refetch();
        } catch (error) {
            toast.error("Couldn't create category: " + error + error?.data?.message || error.error)
            setCreateSelectedFile(null);
            setCreatePreviewURL(null);
            setCreateCategoryName('');
        }
    }

    const createCategoryFileChange = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        if (file) {
            setCreateSelectedFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setCreatePreviewURL(reader.result);
            };
            reader.readAsDataURL(file);
            try {
                setCreateImageURL(null)
                const result = await uploadFile(formData).unwrap();
                toast.success("Image uploaded successfully");
                setCreateImageURL(result.url);
            } catch (error) {
                toast.error("Couldn't upload image: " + error?.data?.message || error.error);
                setCreateSelectedFile(null);
                setCreatePreviewURL(null);
                setCreateCategoryName('');
            }
        } else {
            setCreateImageURL(null)
            setCreateSelectedFile(null);
            setCreatePreviewURL(null);
            setCreateCategoryName('');
        }
    };

    // EDIT Category
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [editCategoryDrawer, toggleEditCategoryDrawer] = useState(true);
    const [editCategoryName, setEditCategoryName] = useState('');
    const [editSelectedFile, setEditSelectedFile] = useState(null);
    const [editPreviewURL, setEditPreviewURL] = useState(null);
    const [editImageURL, setEditImageURL] = useState('https://res.cloudinary.com/dkytadhg9/image/upload/v1708770896/uafdn2h4erwsqjjdruyp.png');
    const [editCategory, { isLoading: editCategoryIsLoading }] = useUpdateCategoryMutation();

    const handleEditButtonClick = (categoryId) => {
        toggleEditCategoryDrawer(!editCategoryDrawer);
        setEditCategoryId(categoryId);
    };

    const editCategorySubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await editCategory(
                {
                    categoryId: editCategoryId,
                    name: editCategoryName,
                    image: editImageURL
                }
            ).unwrap();
            toast.success("Category updated successfully: ");
            toggleEditCategoryDrawer(!editCategoryDrawer);
            setEditSelectedFile(null);
            setEditPreviewURL(null);
            setEditCategoryName('');
            refetch();

        } catch (error) {
            toast.error("Couldn't update category: " + error + error?.data?.message || error.error || JSON.stringify(error))
            setEditSelectedFile(null);
            setEditPreviewURL(null);
            setEditCategoryName('');
        }
    }
    const editCategoryFileChange = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        if (file) {
            setEditSelectedFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setEditPreviewURL(reader.result);
            };
            reader.readAsDataURL(file);
            try {
                setEditImageURL(null)
                const result = await uploadFile(formData).unwrap();
                toast.success("Image uploaded successfully");
                setEditImageURL(result.url);
            } catch (error) {
                toast.error("Couldn't update image: " + error?.data?.message || error.error);
                setEditSelectedFile(null);
                setEditPreviewURL(null);
                setEditCategoryName('');
            }
        } else {
            setEditImageURL(null)
            setEditSelectedFile(null);
            setEditPreviewURL(null);
            setEditCategoryName('');
        }
    };

    // DELETE Category
    const [deleteCategory, { isLoading: deleteCategoryIsLoading }] = useDeleteCategoryMutation();

    const handleDeleteButtonClick = (categoryId) => {
        if (confirm(`Are you sure you want to delete this category: ${categoryId}`)) {
            deleteCategorySubmit(categoryId);
        };
    };
    const deleteCategorySubmit = async (categoryId) => {
        try {
            const result = await deleteCategory(categoryId).unwrap();
            toast.success("Category deleted successfully: ");
            refetch();
        } catch (error) {
            toast.error("Couldn't delete category: " + error + error?.data?.message || error.error)
        }
    }

    // GLOBAL
    useEffect(() => {
        refetch();
    }, [refetch]);

    return (
        <>

            {getIsLoading ? <div className="text-white">
                <div className="w-full h-96 flex items-center justify-center">
                    <svg aria-hidden="true" className="w-20 h-20 text-gray-200 animate-spin dark:text-blue-300 fill-blue-100" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>

                </div>
            </div>
                : getError ? <div>{toast.error(JSON.stringify(error.data))}</div>
                    :

                    <>
                        <Drawer open={createCategoryDrawer} drawerClose={() => { toggleCreateCategoryDrawer(!createCategoryDrawer) }}>
                            <section className="container w-full mx-auto flex items-center justify-center py-32">
                                <form onSubmit={createCategorySubmit}>

                                    <div className="max-w-sm mx-aut shadow-md overflow-hidden items-center border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-800  dark:border-gray-600 dark:hover:border-gray-500 ">
                                        <div className="px-4 py-4">
                                            <h3 className="mt-4 mb-6 flex justify-center text-xl font-semibold dark:text-white text-black">New Category</h3>

                                            <input type="text" name="name" id="name" className="my-4 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder={"Category Name"} value={createCategoryName} onChange={(e) => { setCreateCategoryName(e.target.value) }} />

                                            <div id="image-preview" className="max-w-sm p-6 mb-4 bg-gray-100 dark:bg-gray-700 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer ">

                                                {
                                                    createSelectedFile
                                                        ? <img src={createPreviewURL} className="max-h-48 rounded-lg mx-auto" alt="Image preview" />
                                                        : <>
                                                            <input onChange={createCategoryFileChange} id="uploadCreate" type="file" className="hidden" accept="image/*" name="file" />
                                                            <label htmlFor="uploadCreate" className="cursor-pointer">
                                                                <BsCloudUpload className="w-8 h-8 text-blue-200 mx-auto mb-4" />
                                                                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-200">Upload picture</h5>
                                                                <p className="font-normal text-sm text-gray-400 md:px-6">Choose photo size should be less than <b className="text-blue-200">2mb</b></p>
                                                                <p className="font-normal text-sm text-gray-400 md:px-6">and should be in <b className="text-blue-200">JPG, PNG, or GIF</b> format.</p>
                                                            </label>
                                                        </>
                                                }
                                            </div>
                                            <div className="flex items-center justify-center">
                                                <button disabled={fileIsLoading || createCategoryIsLoading} type="submit" className="w-full">
                                                    <label className="w-full text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 cursor-pointer">
                                                        <span className="text-center ml-2">{(fileIsLoading || createCategoryIsLoading) && <Loader></Loader>}Create Category</span>
                                                    </label>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                            </section>
                        </Drawer>

                        <Drawer open={editCategoryDrawer} drawerClose={() => { toggleEditCategoryDrawer(!editCategoryDrawer) }}>
                            <section className="container w-full mx-auto flex items-center justify-center py-32">
                                <form onSubmit={editCategorySubmit}>

                                    <div className="max-w-sm mx-aut shadow-md overflow-hidden items-center border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-800  dark:border-gray-600 dark:hover:border-gray-500 ">
                                        <div className="px-4 py-4">
                                            <h3 className="mt-4 mb-6 flex justify-center text-xl font-semibold dark:text-white text-black">Edit Category</h3>

                                            <input type="text" name="name" id="name" className="my-4 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder={"Category Name"} value={editCategoryName} onChange={(e) => { setEditCategoryName(e.target.value) }} />

                                            <div id="image-preview" className="max-w-sm p-6 mb-4 bg-gray-100 dark:bg-gray-700 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer ">

                                                {
                                                    editSelectedFile
                                                        ? <img src={editPreviewURL} className="max-h-48 rounded-lg mx-auto" alt="Image preview" />
                                                        : <>
                                                            <input onChange={editCategoryFileChange} id="uploadEdit" type="file" className="hidden" accept="image/*" name="file" />
                                                            <label htmlFor="uploadEdit" className="cursor-pointer">
                                                                <BsCloudUpload className="w-8 h-8 text-blue-200 mx-auto mb-4" />
                                                                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-200">Upload picture</h5>
                                                                <p className="font-normal text-sm text-gray-400 md:px-6">Choose photo size should be less than <b className="text-blue-200">2mb</b></p>
                                                                <p className="font-normal text-sm text-gray-400 md:px-6">and should be in <b className="text-blue-200">JPG, PNG, or GIF</b> format.</p>
                                                            </label>
                                                        </>
                                                }
                                            </div>
                                            <div className="flex items-center justify-center">
                                                <button disabled={fileIsLoading || editCategoryIsLoading} type="submit" className="w-full">
                                                    <label className="w-full text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 cursor-pointer">
                                                        <span className="text-center ml-2">{(fileIsLoading || editCategoryIsLoading) && <Loader></Loader>}Save Category</span>
                                                    </label>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                            </section>
                        </Drawer>
                        <table className="min-w-full table-fixed divide-y divide-gray-200 dark:divide-gray-600">
                            <thead className="bg-gray-100 dark:bg-gray-700">
                                <tr>
                                    <th scope="col" className="p-4 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400">No.</th>
                                    <th scope="col" className="p-4 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Category</th>
                                    <th scope="col" className="p-4 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400 relative">Actions
                                        <button onClick={() => { toggleCreateCategoryDrawer(!createCategoryDrawer) }} type="button"
                                            className={`absolute bg-blue-500 text-white left-[100px] top-1.5 inline-flex items-center rounded-lg px-3 py-2 text-center text-sm font-medium   focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900`}>
                                            <FaPlus className="mr-2 h-4 w-4" />
                                            New category
                                        </button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                {categories.map((category, index) => {
                                    return (
                                        <CategoryRow
                                            editButton={() => handleEditButtonClick(category._id)}
                                            deleteButton={() => handleDeleteButtonClick(category._id)}
                                            no={index + 1} name={category.name} image={category.image} key={index} />
                                    );
                                })}
                            </tbody>
                        </table>
                    </>
            }


        </>
    );
};

export default NewCategory;

