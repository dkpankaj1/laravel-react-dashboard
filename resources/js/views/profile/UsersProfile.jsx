import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getProfile } from '../../services/api/profile.service'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { CButton, CCard, CCardBody } from '@coreui/react'


function UsersProfile() {

    const appNameState = useSelector((state) => state.app.appName)
    const navigate = useNavigate()
    const [userinfo, setUserinfo] = useState({
        name: 'YourProfile Name',
        email: 'Example@email.com',
        phone: '+91-1234567890',
        role: "YourRole",
        address: 'Your Address',
        city: 'YourCity Name',
        state: 'YourState Name',
        country: 'YourCountry Name',
        postal_code: "123456"
    })
    const transformData = (data) => {
        return {
            name: data.name,
            email: data.email,
            phone: data.phone,
            role: data.role,
            address: data.address,
            city: data.city,
            state: data.state,
            country: data.country,
            postal_code: data.postal_code
        }
    }

    useState(() => {
        document.title = `Profile - ${appNameState}`
    }, [])

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
        <CCard className='mb-4'>
            <CCardBody>
                <div className="row g-0">
                    <div className="col-md-4 gradient-custom text-center text-white"
                        style={{ borderTopLeftRadius: ".5rem", borderBottomLeftRadius: ".5rem" }}>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                            alt="Avatar" className="img-fluid my-5" style={{ width: "80px" }} />
                        <h5>{userinfo.name}</h5>
                        <p>{userinfo.role}</p>
                        <CButton color='primary' onClick={() => { return navigate("/app/profile/edit") }} >Edit Profile</CButton>
                        <i className="far fa-edit mb-5"></i>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body p-4">
                            <h6>Information</h6>
                            <hr className="mt-0 mb-4" />
                            <div className="row pt-1">
                                <div className="col-12 mb-3">
                                    <h6>Name</h6>
                                    <p className="text-muted">{userinfo.name}</p>
                                </div>
                                <div className="col-6 mb-3">
                                    <h6>Email</h6>
                                    <p className="text-muted">{userinfo.email}</p>
                                </div>
                                <div className="col-6 mb-3">
                                    <h6>Phone</h6>
                                    <p className="text-muted">{userinfo.phone}</p>
                                </div>
                            </div>
                            <h6>Address</h6>
                            <hr className="mt-0 mb-4" />
                            <div className="row pt-1">
                                <div className="col-6 mb-3">
                                    <h6>Address</h6>
                                    <p className="text-muted">{userinfo.address}</p>
                                </div>
                                <div className="col-6 mb-3">
                                    <h6>City</h6>
                                    <p className="text-muted">{userinfo.city}</p>
                                </div>
                                <div className="col-6 mb-3">
                                    <h6>State</h6>
                                    <p className="text-muted">{userinfo.state}</p>
                                </div>
                                <div className="col-6 mb-3">
                                    <h6>Country</h6>
                                    <p className="text-muted">{userinfo.country}</p>
                                </div>
                                <div className="col-6 mb-3">
                                    <h6>Postal Code</h6>
                                    <p className="text-muted">{userinfo.postal_code}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </CCardBody>
        </CCard>
    )



}

export default UsersProfile