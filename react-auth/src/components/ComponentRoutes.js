import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route,Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import {useAuthState } from "../context";
import routes from '../config/routes';

function ComponentRoutes() {
    const userDetails = useAuthState()
    return (
        <>
            {routes.map((route) => (
            (route.isPrivate && !Boolean(userDetails.token)) ?(
                <Navigate to="/login" />
            ):(
                <Route key={route.path} exact path={route.path} element={<route.component/> } isPrivate={route.isPrivate} />
            )
            ))}
        </>
    )
}
export default ComponentRoutes
