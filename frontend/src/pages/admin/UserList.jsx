import UserRow from "../../components/UserRow";
import { useGetUsersQuery, useDeleteUserMutation, useUpdateUserMutation } from "../../actions/api/usersApiSlice";
import Drawer from "../../components/Drawer";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const UserList = () => {

    const { data: users, refetch, isLoading, error } = useGetUsersQuery();
    const [editUserDrawer, toggleEditUserDrawer] = useState(true);
    const handleEditButtonClick = (userId) => {
        toggleEditUserDrawer(!editUserDrawer);
        setEditableUserId(userId);
    };

    const handleDeleteButtonClick = (userId) => {
        if (confirm(`Delete button clicked for user with ID ${userId}`)) {
            deleteHandler(userId);
        };
    };
 
    const [deleteUser] = useDeleteUserMutation();
    const [updateUser, { updateIsLoading }] = useUpdateUserMutation();

    const [editableUserId, setEditableUserId] = useState(null);
    const [editableUserName, setEditableUserName] = useState("");
    const [editableUserEmail, setEditableUserEmail] = useState("");

    useEffect(() => {
        refetch();
    }, [refetch]);

    const updateHandler = async (updateID) => {
        try {
            await updateUser({
                userId: updateID,
                username: editableUserName,
                email: editableUserEmail,
            });
            setEditableUserId(null);
            refetch();
            toggleEditUserDrawer(!editUserDrawer);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };
    const deleteHandler = async (id) => {
        try {
            await deleteUser(id);
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (<>
        {isLoading ? <div className="text-white">
            <div className="w-full h-96 flex items-center justify-center">
                <svg aria-hidden="true" className="w-20 h-20 text-gray-200 animate-spin dark:text-blue-300 fill-blue-100" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>

            </div>
        </div>
            : error ? <div>{toast.error(JSON.stringify(error.data))}</div>
                :
                <>
                    <Drawer open={editUserDrawer} drawerClose={() => { toggleEditUserDrawer(!editUserDrawer) }} >
                        <div className="p-4 w-4/5 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                            <h3 className="mb-4 text-xl font-semibold dark:text-white">Edit Profile</h3>
                            <form onSubmit={(e) => { e.preventDefault(); updateHandler(editableUserId) }} action="#">
                                <div className="flex flex-col space-y-6">
                                    <div className="">
                                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                        <input type="text" name="username" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder={"username"} value={editableUserName} onChange={(e) => setEditableUserName(e.target.value)} />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Address</label>
                                        <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder={"email"} value={editableUserEmail} onChange={(e) => setEditableUserEmail(e.target.value)} />
                                    </div>
                                    <div className="col-span-6 sm:col-full">
                                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            type="submit">{updateIsLoading && <Loader></Loader>} Save all</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Drawer>

                    <table className="min-w-full table-fixed divide-y divide-gray-200 dark:divide-gray-600">
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
                            {users.map((user, index) => {
                                return (
                                    <UserRow
                                        editButton={() => handleEditButtonClick(user._id)}
                                        deleteButton={() => handleDeleteButtonClick(user._id)}
                                        no={index + 1} username={user.username} email={user.email} dataid={user._id} admin={user.isAdmin} key={index} />
                                );
                            })}
                        </tbody>
                    </table>
                </>
        }
    </>
    );
};

export default UserList;
