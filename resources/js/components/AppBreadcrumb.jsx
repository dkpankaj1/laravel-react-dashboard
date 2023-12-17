import React from 'react'
import { useLocation, NavLink } from 'react-router-dom'

import routes from '../routes'

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname)
    return currentRoute ? currentRoute.name : false
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      const routeName = getRouteName(currentPathname, routes)
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length ? true : false,
        })
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <CBreadcrumb className="my-0">
      <li className='breadcrumb-item'>
        <NavLink to={'/app/dashboard'}>Dashboard</NavLink>
      </li>

      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <li className={breadcrumb.active ? "breadcrumb-item active" : "breadcrumb-item"} key={index} >
            {
              breadcrumb.active
                ? breadcrumb.name
                : <NavLink to={breadcrumb.pathname}>{breadcrumb.name}</NavLink>
            }
          </li>
        )
      })}
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)
