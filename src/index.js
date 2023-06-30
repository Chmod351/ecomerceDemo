import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      {/* Configuración de Toast */}
      <ToastContainer
        autoClose={500}
        hideProgressBar={true}
        toastStyle={{ backgroundColor: '#373737', color: 'white' }}
      />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

