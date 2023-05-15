import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Layout/Home';
import Shop from './components/Shop/Shop';
import Orders from './components/Orders/Orders';
import cartProductsLoader from './loaders/cartProductsLoader';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
    children:[
      {
        path:'/',
        element: <Shop></Shop>,
        loader: () => fetch('http://localhost:3000/allProducts')
      },
      {
        path: '/orders',
        element: <Orders></Orders>,
        loader: cartProductsLoader,
      },
      {
        path: '/inventory',
        element: <p>inventory</p>
      },
      {
        path: '/login',
        element: <p>login</p>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
