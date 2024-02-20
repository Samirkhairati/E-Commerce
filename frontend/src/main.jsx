import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './main.css'
import { Provider } from "react-redux";
import store from "./actions/store";

import {
  Route,
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
  Router
} from 'react-router-dom'


import { SignIn } from './pages/auth/SignIn.jsx';
import { SignUp } from './pages/auth/SignUp.jsx';

import PrivateRoute from './pages/private/PrivateRoute.jsx';
import Profile from './pages/private/Profile.jsx';

import AdminRoute from './pages/admin/AdminRoute.jsx';
import UserList from './pages/admin/UserList.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      {/* <Route index={true} path="/" element={<Home />} /> */}
      {/* <Route path="/favorite" element={<Favorites />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/shop" element={<Shop />} /> */}

      {/* Registered users */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/shipping" element={<Shipping />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<Order />} /> */}
      </Route>

      <Route path="/admin" element={<AdminRoute />}>
        <Route path="userlist" element={<UserList />} />
        {/* <Route path="categorylist" element={<CategoryList />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="allproductslist" element={<AllProducts />} />
        <Route path="productlist/:pageNumber" element={<ProductList />} />
        <Route path="product/update/:_id" element={<ProductUpdate />} />
        <Route path="orderlist" element={<OrderList />} />
        <Route path="dashboard" element={<AdminDashboard />} /> */}
      </Route>
    </Route>  
    
  )
)
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
      <RouterProvider router={router} />
  </Provider>
);