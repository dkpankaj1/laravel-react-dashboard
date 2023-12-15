import React, { Suspense } from 'react'
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { setLoadingState } from './redux/reduces/appSlice'
import { ToastContainer } from 'react-toastify';
import { CSpinner } from '@coreui/react'
import axios from 'axios'

import './scss/style.scss'
import 'react-toastify/dist/ReactToastify.css';

// Containers
const GuestLayout = React.lazy(() => import('./layout/GutetLayout'))
const AppLayout = React.lazy(() => import('./layout/AppLayout'))

// auth pages
const Login = React.lazy(() => import('./views/auth/login/Login'))

// error
const Page404 = React.lazy(() => import('./views/error/Page404'))





import routes from './routes'

const App = () => {

  const dispatch = useDispatch()


  axios.interceptors.request.use((config) => {
    dispatch(setLoadingState(true))
    config.headers.set({
      "Content-Type": "application/json",
      "Accept": "application/json",
    });
    config.baseURL = "/api/v1"
    return config;
  })

  axios.interceptors.response.use(function (response) {
    dispatch(setLoadingState(false))
    return response;
  }, function (error) {
    dispatch(setLoadingState(false))
    return Promise.reject(error);

  });



  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >

        <Routes>
          <Route path='/' element={<GuestLayout />}>

            <Route index element={<Navigate to={'/login'} />} />
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="*" name="Page 404" element={<Page404 />} />

          </Route>

          <Route path='/app' name="app" element={<AppLayout />}>

            <Route index element={<Navigate to={'/app/dashboard'} />} />
            {routes.map((route, idx) => {
              return (
                route.element && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    element={<route.element />}
                  />
                )
              )
            })}

            <Route exact path="/app/*" name="Page 404" element={<Page404 />} />

          </Route>

        </Routes>
        <ToastContainer />
      </Suspense>
    </BrowserRouter>
  )
}

export default App
