import { createRoot } from 'react-dom/client';
import App from './App';
import "./styles/global.scss";
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


const container = document.querySelector('#root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  );
