import React, { useRef } from 'react'
import styled from 'styled-components';
import colors from "../../assets/theme/base/colors"
import hexToRgb from '../../assets/theme/functions/hexToRgb';
import { Toast } from '../../assets/theme/utils/swal';

import firebase from "../../server/firebase";
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore"; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {useNavigate} from "react-router-dom";

import User from '../../server/models/User'
import userService from '../../server/service/UserService';
import AppData from '../../server/models/AppData';
import ThemeSettings from "../../server/models/AppData/ThemeSettings"
import appDataService from '../../server/service/AppDataService';
import { useAuth } from '../../contexts/AuthContext';
import { useAppData } from '../../contexts/AppDataContext';
import { Form, Formik } from 'formik';
import * as Yup from 'yup'
import { inputValidationString } from '../../assets/js/Functions';

const FormGroup = styled.div`
    margin-bottom: 1rem;
`
const UserButton = styled.a`
    display: block;
    width: 100%;
    padding: 0.75rem 1rem;
    color: ${colors.white.main}; 
    border-color: ${colors.white.main}; 
    border-radius: 10rem; 
    font-size: 0.8rem;
`
const UserButtonB = styled.button`
    display: block;
    width: 100%;
    padding: 0.75rem 1rem;
    color: ${colors.white.main}; 
    border-color: ${colors.white.main}; 
    border-radius: 10rem; 
    font-size: 0.8rem;
`;

const FBButton = styled(UserButton)`
    background-color: ${colors.socialMediaColors.facebook.main}; 
    :hover{
        background-color: ${colors.socialMediaColors.facebook.dark}; 
        color: ${colors.white.main};
    }
    :focus, :active{
        box-shadow: 0 0 0 0.25rem rgb(${hexToRgb(colors.socialMediaColors.facebook.main, " ")}/ 25%);
    }
`;

const GoogleButton = styled(UserButton)`
    background-color: ${colors.socialMediaColors.google.main}; 
    :hover{
        background-color: ${colors.socialMediaColors.google.dark}; 
        color: ${colors.white.main};
    }
    :focus, :active{
        box-shadow: 0 0 0 0.25rem rgb(${hexToRgb(colors.socialMediaColors.google.main, " ")}/ 25%);
    }
`
export default function RegistrationForm() {
    const {currentUser} = useAuth();
    const appDataCtx = useAppData();
    const navigate = useNavigate();
    const onSubmitHandler = function(e){
        e.preventDefault();
        Toast.fire({
            icon: 'info',
            title: 'Unable to register at the moment.'
        });
    }
  return (
    <Formik
        initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            username:"",
            password: "",
            passwordConfirm:""
        }}
        validationSchema={Yup.object({
            firstName: Yup.string().required("First Name is required.").max(25),
            lastName: Yup.string().required("Last Name is required.").max(25),
            email: Yup.string().email("Must be a valid email address").required("Email is required.").max(50),
            username: Yup.string().required("Username is required.").max(25),
            password: Yup.string().required("Password is required.").max(25),
            passwordConfirm: Yup.string().required("Password confirmation is required.").max(25).oneOf([Yup.ref("password")], 'Passwords does not match')
        })}
        onSubmit={function(values, {resetForm, ...rest}){
            const firstName = values.firstName;
            const lastName = values.lastName;
            const email = values.email;
            const username = values.username;
            const password = values.password;
            const passwordConfirm = values.passwordConfirm;

            createUserWithEmailAndPassword(firebase.auth, email, password)
                .then(function(registeredUser){
                    const user = new User(
                        "",
                        registeredUser.user.uid,
                        firstName,
                        lastName,
                        email,
                        username,
                        new Date(),// temporary frontend stamp
                        null
                    )
                    /**
                     * Update new user authentication profile
                     */
                    updateProfile(firebase.auth.currentUser, {
                        displayName: user.firstName + " " + user.lastName
                    });
                    /**
                     * Save a new user's Detail
                     */
                    userService.save(user).then(function(result){
                        /**
                         * Initialize new user's AppData
                         */
                        const newAppData = new AppData(
                            "",
                            user.uid,
                            new ThemeSettings(
                                false
                            ),
                            0
                        );

                        //Save new Default App data for the new User
                        appDataService.save(newAppData).then(function(res){
                            appDataCtx.setLoading(true);
                            appDataService.getCurrentUserRecord().then(function(res){
                                if(res){
                                    appDataCtx.setAppData(res[0])
                                    appDataCtx.setLoading(false);
                                    
                                    navigate("/app/", { replace: true });
                                    Toast.fire({
                                        icon: 'success',
                                        title: "Welcome " + firebase.auth.currentUser.displayName
                                    });
                                }
                            }).catch(function(err){
                                appDataCtx.setError(err);
                            });
                        }).catch(function(err){
                            //error handling here for [Save new Default App data for the new User]..
                        })
                        
                    }).catch(function(err){
                        //error handling for [Save a new user's Detail]
                        Toast.fire({
                            icon: 'error',
                            title: "There was a problem saving the new user's data."
                        });
                    });
                }).catch(function(error){
                    //error handling for [createUserWithEmailAndPassword]
                    Toast.fire({
                        icon: 'error',
                        title: 'Error encountered'
                    });
                })
        }}
    >
    {function(formik){
        console.log(formik.errors);
        return(
                <Form className="user">
                    <FormGroup className="row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <input id="firstName" name="firstName" type="text" className={`form-control ${inputValidationString(formik,"firstName")}`} placeholder="First Name"
                                {...formik.getFieldProps('firstName')}
                            />
                            <small className='text-danger'>{formik.errors.firstName ? formik.errors.firstName: "" }</small>
                        </div>
                        <div className="col-sm-6">
                            <input id="lastName" name="lastName" type="text" className={`form-control ${inputValidationString(formik,"lastName")}`} placeholder="Last Name"
                                {...formik.getFieldProps('lastName')}
                            />
                            <small className='text-danger'>{formik.errors.lastName ? formik.errors.lastName: "" }</small>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <input id="email" name="email" type="email" className={`form-control ${inputValidationString(formik,"email")}`} placeholder="Email Address"
                            {...formik.getFieldProps('email')}
                        />
                        <small className='text-danger'>{formik.errors.email ? formik.errors.email: "" }</small>
                    </FormGroup>
                    <FormGroup>
                        <input id="username" name="username" type="text" className={`form-control ${inputValidationString(formik,"username")}`} placeholder="Username"
                            {...formik.getFieldProps('username')}
                        />
                        <small className='text-danger'>{formik.errors.username ? formik.errors.username: "" }</small>
                    </FormGroup>
                    <FormGroup className="row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                            <input id="password" name="password" type="password" className={`form-control ${inputValidationString(formik,"password")}`} placeholder="Password"
                                 {...formik.getFieldProps('password')}    
                            />
                            <small className='text-danger'>{formik.errors.password ? formik.errors.password: "" }</small>
                        </div>
                        <div className="col-sm-6">
                            <input id="passwordConfirm" name="passwordConfirm" type="password" className={`form-control ${inputValidationString(formik,"passwordConfirm")}`} placeholder="Repeat Password"
                                 {...formik.getFieldProps('passwordConfirm')}
                            />
                            <small className='text-danger'>{formik.errors.passwordConfirm ? formik.errors.passwordConfirm: "" }</small>
                        </div>
                    </FormGroup>
                    <UserButtonB className={`btn btn-primary ${!formik.isValid ? "disabled" : ""}`} type="submit">
                        Register Account
                    </UserButtonB>
                    <hr/>
                    <GoogleButton href="javascript:void(0)" onClick={()=>{
                        Toast.fire({
                            icon: 'error',
                            title: 'Unable to register at the moment.'
                        })
                    }} className="btn">
                        <i className="bi bi-google"></i> Register with Google
                    </GoogleButton>
                    <FBButton href="javascript:void(0)" onClick={()=>{
                        Toast.fire({
                            icon: 'error',
                            title: 'Unable to register at the moment.'
                        })
                    }} className="btn mt-2">
                        <i className="bi bi-facebook"></i> Register with Facebook
                    </FBButton>
                </Form>
            )
        }}
    </Formik>
  )
}


