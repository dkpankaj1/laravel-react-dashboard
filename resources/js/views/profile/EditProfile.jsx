import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getProfile, updateProfile } from '../../services/api/profile.service'
import { LOADING_CONST, TOAST_CONST } from '../../config/constent'
import { toast } from 'react-toastify'

import { CButton, CCard, CCardBody, CCol, CForm, CFormInput, CFormLabel, CFormTextarea, } from '@coreui/react'

function EditProfile() {

    const appNameState = useSelector((state) => state.app.appName)
    const appIsLoadingState = useSelector((state) => state.app.isLoading)
    const [userinfo, setUserinfo] = useState({})

    const updateProfileApi = async (formData) => {
        await updateProfile(formData).then(
            (r) => {
                r.data.state === 200 && fetchProfileApi()
                toast.success(r.data.message)
            }
        ).catch(
            (e) => {
                e.response?.data?.errors &&
                    Object.values( e.response?.data?.errors).forEach((error) =>
                        Array.isArray(error)
                            ? error.forEach((e) => toast(e, TOAST_CONST.TYPE.ERROR))
                            : toast(error, TOAST_CONST.TYPE.ERROR),
                    );
            }
        )
    }
    const transformData = (data) => {
        return {
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            city: data.city,
            state: data.state,
            country: data.country,
            postal_code: data.postal_code
        }
    }

    useState(() => {
        document.title = `Edit Profile - ${appNameState}`
    }, [])

    const handleProfileUpdate = (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        updateProfileApi(formData)
    }

    useEffect(() => {
        const fetchProfileApi = async () => {
            await getProfile()
                .then(
                    (r) => {
                        setUserinfo(transformData(r.data.data.user))
                    })
                .catch((e) => { toast.error(e.message); return {} })
        }
        fetchProfileApi()
    }, [])


    return (
        <>
            <CCard className='mb-4'>
                <CCardBody>
                    <div className="card-body p-4">
                        <h6>Information</h6>
                        <hr className="mt-0 mb-4" />
                        <CForm className="row g-3" onSubmit={handleProfileUpdate}>
                            <CCol md={6}>
                                <CFormLabel htmlFor='name'>Name</CFormLabel>
                                <CFormInput name='name' defaultValue={userinfo.name} />
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor='email'>Email</CFormLabel>
                                <CFormInput name='email' defaultValue={userinfo.email} />
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor='phone'>Phone</CFormLabel>
                                <CFormInput name='phone' defaultValue={userinfo.phone} />
                            </CCol>

                            <h6>Address</h6>
                            <hr className="mt-0 mb-4" />
                            <CCol md={6}>
                                <CFormLabel htmlFor='address'>Address</CFormLabel>
                                <CFormTextarea name='address' defaultValue={userinfo.address} />
                            </CCol>
                            <div className="w100"></div>
                            <CCol md={6}>
                                <CFormLabel htmlFor='name'>City</CFormLabel>
                                <CFormInput name='city' defaultValue={userinfo.city} />
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor='name'>State</CFormLabel>
                                <CFormInput name='state' defaultValue={userinfo.state} />
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor='name'>Country</CFormLabel>
                                <CFormInput name='country' defaultValue={userinfo.country} />
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor='name'>Postal Code</CFormLabel>
                                <CFormInput name='postal_code' defaultValue={userinfo.postal_code} />
                            </CCol>

                            <hr className='mt-0 mt-4' />
                            <CCol md={6}>
                                <CButton type='submit' color="primary" className='px-3'>{appIsLoadingState ? LOADING_CONST.UPDATING : "Update"}</CButton>
                            </CCol>

                        </CForm>
                    </div>
                </CCardBody>
            </CCard>




        </>
    )



}

export default EditProfile
