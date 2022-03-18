import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom';

import { ToastContainer } from 'react-toastify';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';

import './utils/navbarStickyAnimation';

import App from './App';

ReactDOM.render(
    <>
        <React.StrictMode>
            <App />
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                limit={5}
            />
        </React.StrictMode>
    </>,
    document.getElementById('root')
);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
