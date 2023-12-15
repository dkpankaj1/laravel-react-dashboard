import React,{useState} from 'react'
import {useSelector} from 'react-redux'

const Dashboard = () => {
 
  const appNameState = useSelector((state) => state.app.appName)
  useState(()=>{
    document.title = `Dashboard - ${appNameState}`
  },[])


  return (
    <>
    <h1>Dashboard</h1>
    </>
  )
}

export default Dashboard
