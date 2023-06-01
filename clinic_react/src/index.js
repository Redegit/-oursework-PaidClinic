import React, { createContext, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

export const RootContext = createContext()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <RootContext.Provider
    value={{
      // server: "http://redraccoon.keenetic.link:8080"
      server: "http://localhost:8080"
    }}>
      <App />
    </RootContext.Provider>
  </React.StrictMode>

);
reportWebVitals();
