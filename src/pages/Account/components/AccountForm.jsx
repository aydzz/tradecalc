import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { UserInfo } from "firebase/auth";
import userService from "../../../server/service/UserService";
import User, {NullUser} from '../../../server/models/User';
import OverlayLoader from '../../../components/Loaders/OverlayLoader';
import appLogger from '../../../assets/js/AppLogger';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {swal, Toast} from "../../../assets/theme/utils/swal"
export default function AccountForm(props) {
    /**@type {{UserInfo}} */
    const {currentUser} = useAuth();

    /**@type {[User, Function]} */
    const [user, setUser] = useState(new NullUser());

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState();

    useEffect(function(){
        userService.getBy("uid",currentUser.uid).then(function(res){
            if(!res){
                appLogger.error("APP: User was not found.")
            }else{
                if(res.length > 1){
                    appLogger.error("APP: Multiple instance of uid detected");
                }else{
                    setUser(res[0]);
                }
                setLoading(false);
            }
        }).catch(function(error){
            setError(error);
            setLoading(false);
        });
    },[])

    useEffect(function(){
        if(error){
            throw new Error(error);
        }
    },[error])
    if(loading){
        return(
            <div className='w-100 d-flex justify-content-center align-items-center' style={{minHeight: "100px"}}>
                <OverlayLoader type="loading-6"/> 
            </div>
        )
    }
  return (
    <Formik
        initialValues={{
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profileURL: currentUser.photoURL
        }}
        validationSchema={Yup.object({
            firstName: Yup.string()
              .max(25, 'Must be 25 characters or less')
              .required('Required'),
            lastName: Yup.string()
              .max(25, 'Must be 25 characters or less')
              .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
        })}
        onSubmit={function(values, {setSubmitting, ...rest}){
            setSubmitting(true);
            Toast.fire({
                title:"Warning",
                text: "Updating profile is currently disabled.",
                icon: "warning"
            })
            setSubmitting(false);
        }}
    >
        {function(formik){
            //do some validation here..
            return(
                <Form className="form-horizontal" onSubmit={formik.handleSubmit}>
                    <div className="form-group row">
                        <label htmlFor="firstName" className="col-sm-2 col-form-label">First Name</label>
                        <div className="col-sm-10">
                        <input 
                            type="text" 
                            className={`form-control ${(formik.touched.firstName && formik.errors.firstName) ? "is-invalid" : (formik.touched.firstName && !formik.errors.firstName) ? "is-valid" : ""}`} 
                            name="firstName" 
                            placeholder="Name"
                            readOnly={false}
                            {...formik.getFieldProps('firstName')}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="lastName" className="col-sm-2 col-form-label">Last Name</label>
                        <div className="col-sm-10">
                        <input type="text" 
                            className={`form-control ${(formik.touched.lastName && formik.errors.lastName) ? "is-invalid" : (formik.touched.lastName && !formik.errors.lastName) ? "is-valid" : ""}`} 
                            name="lastName" 
                            placeholder="Name" 
                            readOnly={false}
                            {...formik.getFieldProps('lastName')}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="email" className="col-sm-2 col-form-label ">Email</label>
                        <div className="col-sm-10">
                        <input type="email" 
                            className={`form-control ${(formik.touched.email && formik.errors.email) ? "is-invalid" : (formik.touched.email && !formik.errors.email) ? "is-valid" : ""}`} 
                            placeholder="Email" 
                            name="email" 
                            readOnly={false}
                            {...formik.getFieldProps('email')}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="profileURL" className="col-sm-2 col-form-label">Profile URL</label>
                        <div className="col-sm-10">
                        <textarea 
                            className={`form-control ${(formik.touched.profileURL && formik.errors.profileURL) ? "is-invalid" : (formik.touched.profileURL && !formik.errors.profileURL) ? "is-valid" : ""}`} 
                            placeholder="Photo URL" 
                            name="profileURL" 
                            readOnly={false}
                            {...formik.getFieldProps('profileURL')}
                            >                    
                            </textarea>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="offset-sm-2 col-sm-10">
                        <button type="submit" className={`btn btn-danger ${!formik.isValid ? "disabled" : ""}`}>Update Profile</button>
                        </div>
                    </div>
                </Form>
            )
        }}
    </Formik>
    
  )
}
