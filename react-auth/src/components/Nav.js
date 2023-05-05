import React from 'react'
import { useAuthDispatch,useAuthState,logout } from "../context";
import { Link, Navigate } from "react-router-dom";
function Nav() {
    const userDetails = useAuthState();
    const dispatch = useAuthDispatch();
    const handleLogout = () => {
        logout(dispatch)
        Navigate('/login')
    }
    return (
        <div>
            <div className="my_nav">
              <ul>
                {!Boolean(userDetails.token) ?(
                  <>
                    <li className="nav-item">
                    <Link to={"/login"} className="">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/register"} className="">
                      Sign Up
                    </Link>
                  </li>
                  </>
                ):(
                    <>
                        <li className="">
                            <Link to={"/"} className="">
                                Home
                            </Link>
                        </li>
                        <li className="">
                            <Link to={"/save-address"} className="">
                                New Address
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="" onClick={handleLogout}>
                                Logout ({userDetails.userDetails.name})
                            </Link>
                        </li>
                    </>
                )}
                
              </ul>
          </div>

        </div>
    )
}

export default Nav
