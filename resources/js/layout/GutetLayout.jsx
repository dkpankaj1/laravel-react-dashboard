import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function GuestLayout() {

  const navigate = useNavigate()
  const appStateIsAuthenticate = useSelector((state) => state.auth.isAuthenticated)


  useEffect(() => {
    if (appStateIsAuthenticate === true) { return navigate('/app/dashboard') }
  }, [appStateIsAuthenticate])

  return (
    <>
      <Outlet />
    </>
  )
}

export default GuestLayout