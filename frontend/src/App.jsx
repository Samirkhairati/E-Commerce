import { Outlet } from 'react-router-dom'
import Navigation from './pages/auth/Navigation'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './app.css'

import { Button } from 'flowbite-react';
import { Carousel } from 'flowbite-react';

function App() {

  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className='flex-grow'>
        <Outlet />
      </main>
    </>
  )
}

export default App



