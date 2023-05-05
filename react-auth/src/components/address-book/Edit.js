import React, { useState, useRef, useEffect } from "react";
import {Route, Link, Routes, useParams, useNavigate} from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, useFormik} from 'formik';
import {show,update} from '../../end-points/Api'


const Edit = (props) => {

    const token='Bearer '+props.token
    const [success,setSuccess]=useState("")
    const [validationErrors,setValidationErrors]=useState({})
    const {id}=useParams();
    const navigate=useNavigate();
    const formik=useFormik({
      initialValues:{
        name:'',
        phone:'',
        email:'',
        age:'',
        gender:'',
        website:'',
        nationality:''
      },
      validate:values => {
        const errors = {};
        if (!values.email) {
          errors.email = "Email can't be empty!!";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address!!';
        }
        if(!values.name)
        {
          errors.name="Name can't be empty!!";
        }
        else if(values.name.length>35)
        {
          errors.name="Name 35 chars only!!";
        }
        if(!values.phone)
        {
          errors.phone="Phone can't be empty!!";
        }
        else if(values.phone.length>15)
        {
          errors.phone="Phone 15 digits only!!";
        }
        if(!values.gender)
        {
          errors.gender="Select gender!!";
        }
        if(values.website!=null && values.website.length>80)
        {
          errors.website="Website length 80 chars only!!";
        }
        
        return errors;
      },
      onSubmit:values=>{
        try{
          fetch(update+""+id, {headers:{
            'content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
          },
          method: 'PUT',
          body: JSON.stringify(values)
        }).then(res => res.json())
          .then(
            json => {
              if(json.message!=undefined)
              {
                setSuccess(json.message)
                setTimeout(()=>{
                  navigate('/')
                },3000)
              }
              else if(json.errors!=undefined){
                console.log(json.errors)
                setValidationErrors(json.errors)
              }
            }
          )
        } catch(err)  {
            console.log(err);
        }
      }
    });

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
          formik.setValues({
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
        <h5 className="text-primary">Edit Address</h5>
        {success!=""?<div className="alert alert-success">{success}</div>:""}
        <Formik>
            <Form onSubmit={formik.handleSubmit}>
            <div className="row">
                <div className="col-md-6">
                    <label>Name * {formik.touched.name?(<span className="text-danger">{formik.errors.name}</span>):null}</label>
                    <Field type="text" name="name" className="form-control" placeholder="Name" onBlur={formik.handleBlur} value={formik.values.name} onChange={formik.handleChange}/>
                </div>
                <div className="col-md-6">
                    <label>Phone * {formik.touched.phone?(<span className="text-danger">{formik.errors.phone}</span>):null}</label>
                    <Field type="text" name="phone" className="form-control" onBlur={formik.handleBlur}  placeholder="Phone" value={formik.values.phone} onChange={formik.handleChange} />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <label>Email * {formik.touched.email?(<span className="text-danger">{formik.errors.email}</span>):null}</label> 
                    <Field type="email" name="email" className="form-control" placeholder="Email" onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange}/>
                </div>
                <div className="col-md-6">
                    <label>Nationality</label>
                    <Field type="text" name="nationality" className="form-control" placeholder="Nationality" onBlur={formik.handleBlur} value={formik.values.nationality} onChange={formik.handleChange}/>
                    {formik.touched.nationality?(<span className="text-danger">{formik.errors.nationality}</span>):null}
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <label>Age</label>
                    <Field type="number" name="age" className="form-control" placeholder="Age" onBlur={formik.handleBlur} value={formik.values.age} onChange={formik.handleChange}/>
                    {formik.touched.age?(<span className="text-danger">{formik.errors.age}</span>):null}
                </div>
                <div className="col-md-6">
                    <label>Gender * {formik.touched.gender?(<span className="text-danger">{formik.errors.gender}</span>):null}</label>
                    <input type="radio" name="gender" onChange={formik.handleChange} checked={formik.values.gender=== "male"} value="male"/> Male
                    <input type="radio" name="gender" onChange={formik.handleChange} checked={formik.values.gender=== "female"} value="female"/> Female
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <label>Website</label>
                    <Field type="text" name="website" className="form-control" onBlur={formik.handleBlur}  placeholder="Website" value={formik.values.website} onChange={formik.handleChange} />
                    {formik.touched.website?(<span className="text-danger">{formik.errors.website}</span>):null}
                </div>
            </div>
        
            <div className="col-md-12">
                <button type="submit" className="btn btn-sm btn-info mt-2 mr-2">Update</button>
            </div>
            </Form>
        
        </Formik>
        
      
    </div>
  );
};

export default Edit;