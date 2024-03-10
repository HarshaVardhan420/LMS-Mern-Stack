
import { BrowserRouter as Routers } from 'react-router-dom'
import Navbarlink from './Navbarlink'
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CheckConnection from './components/CheckConnection';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  // const [count, setCount] = useState(0)
  return (
       <Routers>
        <CheckConnection>
          <Navbar />
          <Navbarlink />
         </CheckConnection>
         <ToastContainer />
       </Routers>
             
  )
}

export default App
