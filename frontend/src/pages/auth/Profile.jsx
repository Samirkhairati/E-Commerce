// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useRegisterMutation } from "../../actions/api/usersApiSlice";
// import { setCredentials } from "../../actions/reducers/authSlice";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";

// export const SignUp = () => {

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [username, setUsername] = useState("");

//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const [register, { isLoading }] = useRegisterMutation();

//     const { userInfo } = useSelector((state) => state.auth);

//     const { search } = useLocation();
//     const sp = new URLSearchParams(search);
//     const redirect = sp.get("redirect") || "/";

//     useEffect(() => {
//         if (userInfo) {
//             navigate(redirect);
//         }
//     }, [navigate, redirect, userInfo]);

//     const submitHandler = async (event) => {
//         event.preventDefault();
//         try {
//             const res = await register({ username, email, password }).unwrap();
//             dispatch(setCredentials({ ...res }));
//             navigate(redirect);
//             toast.success("Account created successfully");
//         } catch (err) {
//             toast.error(err.data);
//         }
//     };


//     return (
//         <section className="h-full justify-center bg-gray-50 dark:bg-gray-900">
//             <div class="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
//                 <div class="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
//                     <img class="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0" src="https://flowbite-admin-dashboard.vercel.app/images/users/bonnie-green-2x.png" alt="Jese picture"/>
//                         <div>
//                             <h3 class="mb-1 text-xl font-bold text-gray-900 dark:text-white">Profile picture</h3>
//                             <div class="mb-4 text-sm text-gray-500 dark:text-gray-400">
//                                 JPG, GIF or PNG. Max size of 800K
//                             </div>
//                             <div class="flex items-center space-x-4">
//                                 <button type="button" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
//                                     <svg class="w-4 h-4 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"></path><path d="M9 13h2v5a1 1 0 11-2 0v-5z"></path></svg>
//                                     Upload picture
//                                 </button>
//                                 <button type="button" class="py-2 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
//                                     Delete
//                                 </button>
//                             </div>
//                         </div>
//                 </div>
//             </div>
//             <div class="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
//             <h3 class="mb-4 text-xl font-semibold dark:text-white">General information</h3>
//             <form action="#">
//                 <div class="grid grid-cols-6 gap-6">
//                     <div class="col-span-6 sm:col-span-3">
//                         <label for="first-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
//                         <input type="text" name="first-name" id="first-name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Bonnie" required>
//                     </div>
//                     <div class="col-span-6 sm:col-span-3">
//                         <label for="last-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
//                         <input type="text" name="last-name" id="last-name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Green" required>
//                     </div>
//                     <div class="col-span-6 sm:col-span-3">
//                         <label for="country" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
//                         <input type="text" name="country" id="country" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="United States" required>
//                     </div>
//                     <div class="col-span-6 sm:col-span-3">
//                         <label for="city" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
//                         <input type="text" name="city" id="city" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="e.g. San Francisco" required>
//                     </div>
//                     <div class="col-span-6 sm:col-span-3">
//                         <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
//                         <input type="text" name="address" id="address" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="e.g. California" required>
//                     </div>
//                     <div class="col-span-6 sm:col-span-3">
//                         <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
//                         <input type="email" name="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="example@company.com" required>
//                     </div>
//                     <div class="col-span-6 sm:col-span-3">
//                         <label for="phone-number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
//                         <input type="number" name="phone-number" id="phone-number" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="e.g. +(12)3456 789" required>
//                     </div>
//                     <div class="col-span-6 sm:col-span-3">
//                         <label for="birthday" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Birthday</label>
//                         <input type="number" name="birthday" id="birthday" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="15/08/1990" required>
//                     </div>
//                     <div class="col-span-6 sm:col-span-3">
//                         <label for="organization" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Organization</label>
//                         <input type="text" name="organization" id="organization" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Company Name" required>
//                     </div>
//                     <div class="col-span-6 sm:col-span-3">
//                         <label for="role" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
//                         <input type="text" name="role" id="role" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="React Developer" required>
//                     </div>
//                     <div class="col-span-6 sm:col-span-3">
//                         <label for="department" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
//                         <input type="text" name="department" id="department" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Development" required>
//                     </div>
//                     <div class="col-span-6 sm:col-span-3">
//                         <label for="zip-code" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Zip/postal code</label>
//                         <input type="number" name="zip-code" id="zip-code" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="123456" required>
//                     </div>
//                     <div class="col-span-6 sm:col-full">
//                         <button class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="submit">Save all</button>
//                     </div>
//                 </div>
//             </form>
//         </div>
//         </section>

//     )
// }
