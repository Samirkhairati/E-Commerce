import { Outlet } from 'react-router-dom'
import Navigation from './pages/auth/Navigation'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './app.css'

function App() {

  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className='py-33'>
        <Outlet />
      </main>
    </>
  )
}

export default App 



