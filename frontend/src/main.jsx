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

import AdminRoute from './pages/admin/AdminRoute.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={< App />}>
      <Route path='/login' element={<SignIn />}></Route>
      <Route path='/register' element={<SignUp />}></Route>

      <Route path="/admin" element={<AdminRoute />}>
        <Route path="userlist" element={<></>} />
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