import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Journal from './journal/Journal';
import NewPage from './journal/NewPage';
import Shuffle from './shuffle/Shuffle';
import ErrorPage from './ErrorPage';
import Search from './search/Search';
import Settings from './settings/Settings';
import CardProfile from './cards/CardProfile';
import reportWebVitals from './reportWebVitals.js';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [{
      errorElement: <ErrorPage />,
      children: [
        {
          element: <Shuffle />,
          index: true
        },
        {
          path: 'journal',
          element: <Journal />
        },
        {
          path: 'search',
          element: <Search />
        },
        {
          path: 'newPage',
          element: <NewPage />
        },
        {
          path: 'settings',
          element: <Settings />
        },
        {
          path: 'cards/:img',
          element: <CardProfile />
        }
      ]
    }
    ]
  }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log());
