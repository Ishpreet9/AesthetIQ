import React from 'react';
import Home from './pages/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import BuyCredits from './pages/BuyCredits';
import Generate from './pages/Generate';
import Profile from './pages/Profile';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import AllGenerations from './pages/AllGenerations';

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/buy",
          element: <BuyCredits />
        },
        {
          path: "/generate",
          element: <Generate />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/all-generations",
          element: <AllGenerations />
        },
        {
          path: "/profile",
          element: <Profile/>
        }
      ]
    }
  ]);

  return (
    <div className='min-h-screen'>
      <ToastContainer theme='dark' position='top-left'/>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
