import React from "react";

const Login = React.lazy(() => import("../../pages/auth/login/index"));

export const publicRoutes = [
    {path:'login',component:<Login />}
]

export const privateRoutes = []