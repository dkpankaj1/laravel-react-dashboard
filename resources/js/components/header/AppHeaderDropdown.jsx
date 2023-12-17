import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutProcess } from '../../redux/reduces/authSlice'
import { LOADING_CONST } from '../../config/constent'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilAccountLogout,
  cilSettings,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import { NavLink } from 'react-router-dom'

const AppHeaderDropdown = () => {
  const dispatch = useDispatch()
  const appLoadingState = useSelector((state) => state.app.isLoading)

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logoutProcess())
  }


  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>

        <NavLink to={'/app/profile'} className={"dropdown-item"}>
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </NavLink>
        
        <NavLink to={'/app/setting'} className={"dropdown-item"}>
        <CIcon icon={cilSettings} className="me-2" />
          Settings
        </NavLink>

        <CDropdownItem href="/logout" onClick={handleLogout}>
        <CIcon icon={cilAccountLogout} className="me-2" />
          {appLoadingState == true ? LOADING_CONST.LOGOUT: "LogOut"}
        </CDropdownItem>

      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
