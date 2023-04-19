import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux'
import store from '../src/redux/store'
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
      <ToastContainer autoClose={4000} />
      <App />
    </Provider>
);
