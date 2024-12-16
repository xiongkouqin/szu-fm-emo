import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

//redux
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

// reducers
import authReducer from './redux/reducers/authReducer';
import filefolderReducer from './redux/reducers/filefolderReducer';

// add al reducers 
const reducers = combineReducers({
  auth: authReducer,
  filefolders: filefolderReducer,
});

// create a store, which is a 'gloabl place' to store data 
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // use the provider to make our app can access the global storage
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
