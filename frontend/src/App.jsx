import { Outlet } from 'react-router-dom'
import Navigation from './pages/auth/Navigation'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './app.css'

import { Button } from 'flowbite-react';

function App() {

  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className='py-33'>
        <Outlet />
      </main>
      <div className="flex flex-wrap gap-2">
        <Button>Default</Button>
        <Button color="red">Blue</Button>
        <Button color="gray">Gray</Button>
        <Button color="dark">Dark</Button>
        <Button color="light">Light</Button>
        <Button color="success">Success</Button>
        <Button color="failure">Failure</Button>
        <Button color="warning">Warning</Button>
        <Button color="purple">Purple</Button>
      </div>
    </>
  )
}

export default App



