import { MainRoutes } from "./routes"
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  return (
    <div className="h-[100vh] w-full flex items-center justify-center">
      <MainRoutes/>
      <ToastContainer/>
    </div>
  )
}

export default App
