import React, { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik} from 'formik';
import {signup} from '../end-points/Api';
import { useNavigate} from 'react-router-dom';
import { loginUser, useAuthDispatch } from '../context'



const Register = () => {
  const [success,setSuccess]=useState("")
  const [validationErrors,setValidationErrors]=useState([])
  const navigate=useNavigate();
  const dispatch = useAuthDispatch() 
  const formik=useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      password_confirmation:''
    },
    validate:values => {
      const errors = {};
      if (!values.name) {
        errors.name = "Name can't be empty!!";
      }
      if(values.name!=undefined && values.name.length>45)
      {
        errors.name = "Name 45 characters only!!";
      }
      if (!values.email) {
        errors.email = "Email can't be empty!!";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address!!';
      }
      if(!values.password)
      {
         errors.password="Password can't be empty!!";
      }
      if(values.password!=undefined && values.password.length<6)
      {
        errors.password = "Password must be 6 charactres long!!";
      }

      if(!values.password_confirmation)
      {
         errors.password_confirmation="Confirm Password!";
      }else if(values.password!=values.password_confirmation)
      {
         errors.password_confirmation="Password & Confirm Password mismatch!!";
      }
      return errors;
    },
    onSubmit:values=>{
      try{
        fetch(signup, {headers:{
          'content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer 1|63lPf0axzoVbahXpKibmpLTbi8HQLPV118E7y3qp'
        },
        method: 'POST',
        body: JSON.stringify(values)
      }).then(res => res.json())
        .then(
          json => {
            if(json.errors!=undefined){
              setValidationErrors(json.errors)
              console.log(validationErrors)
            }else 
            {
              setSuccess(json.message)
              if(json.user)
              {
                localStorage.setItem('currentUser', JSON.stringify(json));
                dispatch({ type: 'LOGIN_SUCCESS', payload: json });
                navigate('/')
              }
            }
          }
        )
      } catch(err)  {
          console.log(err);
      }
    }
  });

  return (
    <div className="col-md-12">
      <div className="card card-container">
      {success!=""?<div className="alert alert-success">{success}</div>:""}
      <h5 className="text-primary">Signup Here</h5>
      <Formik>
       {({ isSubmitting }) => (
         <Form onSubmit={formik.handleSubmit}>
           <Field type="text" name="name" className="form-control" placeholder="Name" onBlur={formik.handleBlur} value={formik.values.name} onChange={formik.handleChange}/>
           <span className="text-danger">{validationErrors.name!=undefined?validationErrors.name[0]:""}</span>
           {formik.touched.name?(<span className="text-danger">{formik.errors.name}</span>):null}
           <Field type="email" name="email" className="form-control mt-2" placeholder="Email" onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange}/>
           {formik.touched.email?(<span className="text-danger">{formik.errors.email}</span>):null}
           <span className="text-danger">{validationErrors.email!=undefined?validationErrors.email[0]:""}</span>
           <Field type="password" name="password" className="form-control mt-2" onBlur={formik.handleBlur}  placeholder="Password" value={formik.values.password} onChange={formik.handleChange} />
           <span className="text-danger">{validationErrors.password!=undefined?validationErrors.password[0]:""}</span>
           {formik.touched.password?(<span className="text-danger">{formik.errors.password}</span>):null}
           <Field type="password" name="password_confirmation" className="form-control mt-2" onBlur={formik.handleBlur}  placeholder="Confirm Password" value={formik.values.password_confirmation} onChange={formik.handleChange} />
           {formik.touched.password_confirmation?(<span className="text-danger">{formik.errors.password_confirmation}</span>):null}
           <div className="col-md-12">
              <button type="submit" className="btn btn-sm btn-primary mt-2 float-right">Signup</button>
           </div>
         </Form>
       )}
     </Formik>
        
      </div>
    </div>
  );
};

export default Register;