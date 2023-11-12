import { BrowserRouter } from 'react-router-dom';

import RoutesApp from './routes';
import AuthProvider from './contexts/auth';

import { ToastContainer } from 'react-toastify';

import './default.css';
import 'react-tooltip/dist/react-tooltip.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer autoClose={3000} style={{ width: "400px"}} />
        <RoutesApp />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
