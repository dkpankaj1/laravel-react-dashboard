import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Profile = React.lazy(() => import("./views/profile/profile"));

const routes = [
    { path: "/app/dashboard", name: "Dashboard", element: Dashboard },
    { path: "/app/profile", name: "profile", element: Profile },
];

export default routes;
