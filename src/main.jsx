import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import  store  from "./store/store.js";
import { Route,RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Protected } from "./components/index.js";
import  Login  from "./Pages/Login.jsx";
import  Signup  from "./Pages/Signup.jsx";

import EditPost from "./Pages/EditPost";
import Home from './Pages/Home.jsx'
import Post from "./Pages/Postpage.jsx";

import AllPosts from "./Pages/AllPost.jsx";
import AddPost from './Pages/AddPost.jsx'

const router = createBrowserRouter(

  createRoutesFromElements(
  <Route path='/' element={<App/>} >
    <Route path='/' element={<Home/>}  />
    
    <Route path='/login' element={(
      <Protected authentication={false}>
        <Login/>
      </Protected>
    )}  />
    
    <Route path='/signup' element={(
      <Protected authentication={false}>
        <Signup/>
      </Protected>
    )}  />

    <Route path='/all-posts' element={(
      <Protected authentication={" "}>
        <AllPosts/>
      </Protected>
    )}  />
    
    <Route path='/add-post' element={(
      <Protected authentication={" "}>
        <AddPost/>
      </Protected>
    )}  />

    <Route path='/edit-post/:slug' element={(
      <Protected authentication={" "}>
        <EditPost/>
      </Protected>
    )}  />

    <Route path='/post/:slug' element={<Post/>} />

  </Route>

))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)