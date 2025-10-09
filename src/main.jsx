import React from 'react'; // Often good practice to import React
import ReactDOM from 'react-dom/client'; // <--- **Add this line**
import { BrowserRouter } from 'react-router-dom';
import App from './App'; // Assuming App is in './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/3dportfolio">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);