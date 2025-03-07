import React from 'react';
import Home from './pages/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import BuyCredits from './pages/BuyCredits';


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
        }
      ]
    }
  ]);

  return (
    <div className='min-h-screen'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
