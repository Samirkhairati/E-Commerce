import { Outlet } from 'react-router-dom'
import Navigation from './pages/auth/Navigation'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <>
      <ToastContainer />
      <Navigation />
      <main style={{}} className='main-sizing absolute right-0 bottom-0'>
        <Outlet />
      </main>
    </>
  )
}

export default App



