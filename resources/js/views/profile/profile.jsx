import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function profile() {

    const appNameState = useSelector((state) => state.app.appName)
    useState(() => {
        document.title = `Profile - ${appNameState}`
    }, [])



    return (
        <div>profile</div>
    )
}

export default profile