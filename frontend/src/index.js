import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import { BrowserRouter as Router } from "react-router-dom";

const rootElement = ReactDOM.createRoot(document.getElementById('root'));

rootElement.render(
    <Router>
        <App />
    </Router>
    );