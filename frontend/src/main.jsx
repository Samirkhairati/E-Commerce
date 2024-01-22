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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={< App />}>
      <Route path='/login' element={<SignIn />}></Route>
    </Route>
  )
)

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <RouterProvider router={router} />
// )
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
      <RouterProvider router={router} />
  </Provider>
);