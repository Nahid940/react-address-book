import React, { useState, useEffect } from "react";
import { useParams, useNavigate} from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, useFormik} from 'formik';
import {show} from '../../end-points/Api'


const Edit = (props) => {

    const token='Bearer '+props.token
    const [address,setAddress]=useState({})
    const {id}=useParams();
    const navigate=useNavigate();

    const fetchAddress = () => {
      fetch(show+""+id,{headers:{
            'content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
      }})
      .then(response => {
          return response.json()
      })
      .then(data => {
        if (data!=undefined) {
            setAddress({
            ...data
          });
        }
      })
  }

  useEffect(() => {
    fetchAddress()
  }, [])

  return (
    <div className="col-md-8 offset-md-2">
        <h5 className="text-primary">View Address</h5>
        <table className="table">
            <tr>
                <td>Name</td>
                <td>:</td>
                <td>{address.name}</td>
            </tr>
            <tr>
                <td>Phone</td>
                <td>:</td>
                <td>{address.phone}</td>
            </tr>
            <tr>
                <td>Email</td>
                <td>:</td>
                <td>{address.email}</td>
            </tr>
            <tr>
                <td>Gender</td>
                <td>:</td>
                <td>{address.gender}</td>
            </tr>
            <tr>
                <td>Nationality</td>
                <td>:</td>
                <td>{address.nationality}</td>
            </tr>
            <tr>
                <td>Website</td>
                <td>:</td>
                <td>{address.website}</td>
            </tr>
        </table>
    </div>
  );
};

export default Edit;