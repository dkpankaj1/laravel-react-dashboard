import axios from "axios";

const apiRoute = {
    PROFILE:{
        METHOD : "get",
        URL : "/profile"
    },
    UPDATE_PROFILE:{
        METHOD : "put",
        URL : "/profile"
    }
}

const getProfile = async () => {
    return await axios.get(apiRoute.PROFILE.URL)
};

const updateProfile = async (profileData) => {
    return await axios.put(apiRoute.UPDATE_PROFILE.URL,profileData)
};

export { getProfile, updateProfile };
