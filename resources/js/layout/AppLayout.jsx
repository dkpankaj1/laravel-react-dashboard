import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const AppLayout = () => {

  const navigate = useNavigate()
  const appStateIsAuthenticate = useSelector((state) => state.auth.isAuthenticated)
  const accessToken = useSelector((state) => state.auth.accessToken)

  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;


  useEffect(() => {
    if (appStateIsAuthenticate !== true) { return navigate('/login') }
  }, [appStateIsAuthenticate])


  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default AppLayout
