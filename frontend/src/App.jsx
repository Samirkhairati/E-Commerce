import { Outlet } from 'react-router-dom'
import Navigation from './pages/auth/Navigation'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {

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



