import Router from './routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <>
      <Router />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
      />
    </>
  )
}

export default App