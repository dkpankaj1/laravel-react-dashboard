import React, {useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { loginProcess } from '../../../redux/reduces/authSlice'
import { LOADING_CONST } from '../../../config/constent';

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {

  const dispatch = useDispatch()
  
  const themeSchemeState = useSelector((state) => state.app.dashboardLayout.colorScheme) 
  const appLoadingState = useSelector((state) => state.app.isLoading)
  
  useEffect(() => {
    document.querySelector('html').setAttribute('data-coreui-theme',themeSchemeState)
  },[themeSchemeState])


  const handleSubmit = (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    dispatch(loginProcess({email : form?.get('email'),password  :form?.get('password')}))
  }


  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput type='email' name='email' placeholder="Username" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name='password'
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type='submit'>
                          {appLoadingState == true ? LOADING_CONST.LOGING: "Login"}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
