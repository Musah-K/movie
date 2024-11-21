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
import CreateMovie from './pages/Admin/createMovie.jsx'
import AdminMoviesList from './pages/Admin/AdminMoviesList.jsx'
import UpdataMovie from './pages/Admin/UpdataMovie.jsx'
import AllMovies from './pages/Movies/AllMovies.jsx'
import MovieDetail from './pages/Movies/movieDetail.jsx'
import AllComments from './pages/Admin/AllComments.jsx'
import AdminDashbord from './pages/Admin/Dashbord/AdminDashbord.jsx'

const router = createBrowserRouter([
  { path: '/', element: <App/>, children: [
    { path:"/", /**index:true, **/ element: < Home />, index: true },
    {path:'/register', element: <Register/>},
    {path: '/login', element: <Login />},
    {path:'/movies', element: <AllMovies />},
    {path:'/movies/:id', element: <MovieDetail />},

    {path: "", element:<PrivateRoutes />, children:[
      {path: '/profiles', element: <Profile /> },
    ]},
    {path: "", element: <AdminRoutes />, children:[
      {path:'/admin/movies/genres', element: <GenreList />},
      {path:'/admin/movies/create', element: <CreateMovie />},
      {path:'/admin/movies-list', element: <AdminMoviesList />},
      {path:'/admin/movies/update/:id', element: <UpdataMovie />},
      {path:'/admin/movies/dashbord', element: <AdminDashbord />},
      {path:'/admin/movies/comments', element: <AllComments />},
      
    ]}

  ]},
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
,
)
