import React, { useState } from "react";
import { useNavigate  } from 'react-router-dom';
import { Formik, Form, Field, useFormik} from 'formik';
import { loginUser, useAuthDispatch } from '../context'

const Login = (props) => {
  const [error,setError]=useState("")
  const navigate=useNavigate();
  const dispatch = useAuthDispatch() 
//   if (isLoggedIn) {
//     return <Navigate to="/profile" />;
//   }

  const formik=useFormik({
    initialValues:{
      email:'',
      password:''
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
      if(!values.password)
      {
         errors.password="Password can't be empty!!";
      }
      return errors;
    },
    
    onSubmit:async (values)=>{
      try {
          let response = await loginUser(dispatch, values)
          if (!response.user) {
            return
          }
          navigate('/')
      } catch (error) {
        setError("Invalid login!")
      }
    }
  });

  return (
    <div className="col-md-12">
      <div className="card card-container">
      {error!=""?<div className="alert text-light bg-danger">{error}</div>:""}
      <h5 className="text-primary">Login Here</h5>
      <Formik>
       {({ isSubmitting }) => (
         <Form onSubmit={formik.handleSubmit}>
           <Field type="email" name="email" className="form-control" placeholder="Email" onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange}/>
           {formik.touched.email?(<span className="text-danger">{formik.errors.email}</span>):null}
           <Field type="password" name="password" className="form-control mt-2" onBlur={formik.handleBlur}  placeholder="Password" value={formik.values.password} onChange={formik.handleChange} />
           {formik.touched.password?(<span className="text-danger">{formik.errors.password}</span>):null}
           <div className="col-md-12">
              <button type="submit" className="btn btn-sm btn-primary mt-2 float-right">Login</button>
           </div>
         </Form>
       )}
     </Formik>
        
      </div>
    </div>
  );
};

export default Login;