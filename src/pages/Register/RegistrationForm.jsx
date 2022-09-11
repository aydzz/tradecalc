import React, { useRef } from 'react'
import styled from 'styled-components';
import colors from "../../assets/theme/base/colors"
import hexToRgb from '../../assets/theme/functions/hexToRgb';
import { Toast } from '../../assets/theme/utils/swal';

import firebase from "../../server/firebase";
import { doc, setDoc } from "firebase/firestore"; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {useNavigate} from "react-router-dom";

import User from '../../server/models/User'
import userService from '../../server/service/UserService';
import AppData from '../../server/models/AppData';
import ThemeSettings from "../../server/models/AppData/ThemeSettings"
import appDataService from '../../server/service/AppDataService';

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
    const regForm = useRef();
    const navigate = useNavigate();
    const onSubmitHandler = function(e){
        e.preventDefault();
        console.log(e);
        Toast.fire({
            icon: 'info',
            title: 'Unable to register at the moment.'
        });
    }
  return (
    <form className="user" ref={regForm} onSubmit={(e)=>{
        e.preventDefault();
        const firstName = regForm.current.querySelector("#spt-data-firstname").value;
        const lastName = regForm.current.querySelector("#spt-data-lastname").value;
        const email = regForm.current.querySelector("#spt-data-email").value;
        const username = regForm.current.querySelector("#spt-data-username").value;
        const password = regForm.current.querySelector("#spt-data-password").value;
        const passwordConfirm = regForm.current.querySelector("#spt-data-password-confirm").value;
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
                 * Save a new user's Detail
                 */
                userService.save(user)
                .then(function(result){
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
                    appDataService.save(newAppData).then(function(res){
                        navigate("/app/", { replace: true });
                        Toast.fire({
                            icon: 'success',
                            title: "Successfully registered a new Account."
                        });
                    }).catch(function(err){
                        //do something here...
                        console.log(err);
                    })
                    
                })
                .catch(function(err){
                    console.log(err);
                    Toast.fire({
                        icon: 'error',
                        title: "There was a problem saving the new user's data."
                    });
                });
            }).catch(function(error){
                console.log(error)
                Toast.fire({
                    icon: 'error',
                    title: 'Error encountered'
                });
            })
        }
    }>
        <FormGroup className="row">
            <div className="col-sm-6 mb-3 mb-sm-0">
                <input id="spt-data-firstname" type="text" className="form-control" placeholder="First Name"/>
            </div>
            <div className="col-sm-6">
                <input id="spt-data-lastname" type="text" className="form-control" placeholder="Last Name"/>
            </div>
        </FormGroup>
        <FormGroup>
            <input id="spt-data-email" type="email" className="form-control" placeholder="Email Address"/>
        </FormGroup>
        <FormGroup>
            <input id="spt-data-username" type="text" className="form-control" placeholder="Username"/>
        </FormGroup>
        <FormGroup className="row">
            <div className="col-sm-6 mb-3 mb-sm-0">
                <input id="spt-data-password" type="password" className="form-control" placeholder="Password"/>
            </div>
            <div className="col-sm-6">
                <input id="spt-data-password-confirm" type="password" className="form-control" placeholder="Repeat Password"/>
            </div>
        </FormGroup>
        <UserButtonB className="btn btn-primary" type="submit">
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
    </form>
  )
}