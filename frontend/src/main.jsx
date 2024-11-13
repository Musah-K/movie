import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from "./pages/Home.jsx"
import { Provider } from 'react-redux'
import store from './app/store.js'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import Register from './pages/Auth/Register.jsx'
import Login from './pages/Auth/Login.jsx'
import Profile from './components/privatePages/Profile.jsx'
import PrivateRoutes from './pages/Auth/PrivateRoutes.jsx'

import AdminRoutes from './pages/Admin/AdminRoutes.jsx'
import GenreList from  './pages/Admin/GenreList.jsx'

const router = createBrowserRouter([
  { path: '/', element: <App/>, children: [
    { path:"/", element: < Home />, index: true },
    {path:'/register', element: <Register/>},
    {path: '/login', element: <Login />},

    {path: "", element:<PrivateRoutes />, children:[
      {path: '/profiles', element:<Profile /> },
    ]},
    {path: "", element: <AdminRoutes />, children:[
      {path:'admin/movies/genres', element:<GenreList />}
    ]}

  ]},
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
,
)
