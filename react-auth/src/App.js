import React, { useState, useEffect, useCallback } from "react";
import { Routes, Link, Route,Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useAuthState } from "./context";
import routes from './config/routes';
import Nav from "./components/Nav";
{/* <route.component/> */}
const App = () => {
  const userDetails = useAuthState()
  return (
    <div>
      <div className="container mt-3">
          
            <Nav/>
            <Routes>
              {routes.map((route) => (
                  <Route key={route.path} exact path={route.path} element={
                    (route.isPrivate && !Boolean(userDetails.token)) ?(<Navigate key={route.path} to="/login" />):( <route.component token={userDetails.token}/>)
                  } isPrivate={route.isPrivate} />
              ))}
            </Routes>
            
          
          
      </div>
      
    </div>
  );
};

export default App;