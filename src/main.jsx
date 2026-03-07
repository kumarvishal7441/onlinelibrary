import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from './pages/NotFound.jsx'
import Home from './pages/Home.jsx'
import BrowseBooks from './pages/BrowseBook.jsx'
import AddBook from './pages/Addbook.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    errorElement:<NotFound/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/browse",
        element:<BrowseBooks/>
      },
      {
        path:"/browse/:category",
        element:<BrowseBooks/>
      },
      {
        path:"/addbook",
        element:<AddBook/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
