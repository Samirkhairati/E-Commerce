import { Outlet } from 'react-router-dom'
import Navigation from './pages/auth/Navigation'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'


function App() {
  const isDarkMode = useSelector((state) => state.dark.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    }
    else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className='main-sizing absolute right-0 bottom-0'>
        <Outlet />
      </main>
      <div className='hidden tailwind-utility-extractor'>
        <div className="text-red-400"></div>
        <div className="text-blue-400"></div>
        <div className="text-green-400"></div>
        <div className="text-purple-400"></div>
        <div className="text-pink-400"></div>
        <div className="text-indigo-400"></div>
      </div>
    </>
  )
}

export default App



