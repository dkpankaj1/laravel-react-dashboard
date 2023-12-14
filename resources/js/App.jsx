import React, { Suspense } from 'react'
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom'

import { CSpinner} from '@coreui/react'
import './scss/style.scss'

// Containers
const GuestLayout = React.lazy(() => import('./layout/GutetLayout'))
const AppLayout = React.lazy(() => import('./layout/AppLayout'))

// Pages
const Login = React.lazy(() => import('./views/auth/login/Login'))
const Page404 = React.lazy(() => import('./views/error/Page404'))



import routes from './routes'

const App = () => {

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

            <Route index element={<Navigate to={'/app/dashboard'}/>} />
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

      </Suspense>
    </BrowserRouter>
  )
}

export default App
