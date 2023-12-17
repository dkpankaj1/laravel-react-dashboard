import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Profile = React.lazy(() => import("./views/profile/UsersProfile"));
const ProfileEdit = React.lazy(() => import("./views/profile/EditProfile"));

const routes = [
    { path: "/app/dashboard", name: "", element: Dashboard },
    { path: "/app/profile", name: "profile", element: Profile },
    { path: "/app/profile/edit", name: "edit profile", element: ProfileEdit },
];

export default routes;
