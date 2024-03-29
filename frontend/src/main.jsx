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
import { useSelector } from "react-redux";

// PUBLIC 
import { SignIn } from './pages/auth/SignIn.jsx';
import { SignUp } from './pages/auth/SignUp.jsx';
import Categories from './pages/public/Categories.jsx'
import Shop from './pages/public/Shop.jsx';
import ProductDetails from './pages/public/ProductDetails.jsx';
import Home from './pages/public/Home.jsx';
import CategorizedProducts from './pages/public/CategorizedProducts.jsx';

// PRIVATE
import PrivateRoute from './pages/private/PrivateRoute.jsx';
import Profile from './pages/private/Profile.jsx';
import Cart from './pages/private/Cart.jsx';
import UserOrders from './pages/private/UserOrders.jsx';

// ADMIN
import AdminRoute from './pages/admin/AdminRoute.jsx';
import UserList from './pages/admin/UserList.jsx';
import CategoryList from './pages/admin/CategoryList.jsx';
import ProductList from './pages/admin/ProductList.jsx';
import OrderList from './pages/admin/OrderList.jsx'


const router = createBrowserRouter(

  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route index={true} path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/categories/:id" element={<CategorizedProducts />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/categories" element={<Categories />} />

      <Route path="me" element={<PrivateRoute />}>
        <Route path="profile" element={<Profile />} />
        <Route path="cart" element={<Cart />} />
        <Route path="orders" element={<UserOrders />} />
      </Route>

      <Route path="admin" element={<AdminRoute />}>
        <Route path="users" element={<UserList />} />
        <Route path="category" element={<CategoryList />} />
        <Route path="products" element={<ProductList />} />
        <Route path="orders" element={<OrderList />} />
      </Route>
    </Route>

  )
)
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);