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

// PRIVATE
import PrivateRoute from './pages/private/PrivateRoute.jsx';
import Profile from './pages/private/Profile.jsx';

// ADMIN
import AdminRoute from './pages/admin/AdminRoute.jsx';
import UserList from './pages/admin/UserList.jsx';
import CategoryList from './pages/admin/CategoryList.jsx';
import ProductList from './pages/admin/ProductList.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      {/* <Route index={true} path="/" element={<Home />} /> */}
      {/* <Route path="/favorite" element={<Favorites />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} /> */}
      <Route path="/shop" element={<Shop />} />
      <Route path="/categories" element={<Categories />} />

      {/* Registered users */}
      <Route path="me" element={<PrivateRoute />}>
        <Route path="profile" element={<Profile />} />
        {/* <Route path="/shipping" element={<Shipping />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<Order />} /> */}
      </Route>

      <Route path="admin" element={<AdminRoute />}>
        <Route path="users" element={<UserList />} />
        <Route path="category" element={<CategoryList />} />
        <Route path="productlist" element={<ProductList />} />
        {/* <Route path="orderlist" element={<OrderList />} /> */}
      </Route>
    </Route>  
    
  )
)
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
      <RouterProvider router={router} />
  </Provider>
);