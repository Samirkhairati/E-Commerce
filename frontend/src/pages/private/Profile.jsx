import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { useProfileMutation } from "../../actions/api/usersApiSlice";
import { setCredentials } from "../../actions/reducers/authSlice";
import { Link } from "react-router-dom";

import Loader from "../../components/Loader";

const Profile = () => {

    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const { userInfo } = useSelector((state) => state.auth);

    const [updateProfile, { isLoading }] = useProfileMutation();

    useEffect(() => {
        setUserName(userInfo.username);
        setEmail(userInfo.email);
    }, [userInfo.email, userInfo.username]);

    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await updateProfile({
                _id: userInfo._id,
                username,
                email,
                password,
            }).unwrap();
            dispatch(setCredentials({ ...res }));
            toast.success("Profile updated successfully");
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };


    return (
        <>
            <section className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">

                <div className="p-4 w-4/5 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                    <h3 className="mb-4 text-xl font-semibold dark:text-white text-black">Edit Profile</h3>
                    <form onSubmit={submitHandler} action="#">
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6">
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                <input type="text" name="username" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder={"username"} value={username} onChange={(e) => setUserName(e.target.value)} />
                            </div>
                            <div className="col-span-6">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Address</label>
                                <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder={"email"} value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="col-span-6">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="***********" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="col-span-6 sm:col-full">
                                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    type="submit">{isLoading && <Loader></Loader>} Save all</button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>

        </>
    );
};

export default Profile;
