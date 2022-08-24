import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components';
import colors from "../../assets/theme/base/colors"
import hexToRgb from '../../assets/theme/functions/hexToRgb';
import { Toast } from '../../assets/theme/utils/swal';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {signInWithEmailAndPassword, signOut} from "firebase/auth"
import firebase from '../../server/firebase';

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
export default function LoginForm() {
    const loginForm = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const rememberMeRef = useRef();
    const auth = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleLogin = async function (e) {
        e.preventDefault();
        try {
          setError("");
          setLoading(true);
          await signInWithEmailAndPassword(firebase.auth, emailRef.current.value, passwordRef.current.value);
          Toast.fire({
            icon: "success",
            title: "Successfully logged in!",
          });
          navigate("/app/", { replace: true });
        } catch (error) {
          console.log(error);
          setError("Failed to login!");
          Toast.fire({
            icon: "error",
            title: "Login failed, please try again!",
          });
        }
        setLoading(false);
      };
  return (
    <form className="user" ref={loginForm} onSubmit={handleLogin}>
        <FormGroup>
            <input ref={emailRef} id="spt-data-email" type="email" className="form-control" placeholder="Email Address"/>
        </FormGroup>
        <FormGroup>
            <input ref={passwordRef}id="spt-data-password" type="password" className="form-control" placeholder="Password"/>
        </FormGroup>

        <UserButtonB className="btn btn-primary" type="submit">
            Login
        </UserButtonB>
        <hr/>
        <GoogleButton href="javascript:void(0)" onClick={()=>{
            Toast.fire({
                icon: 'error',
                title: 'Unable to register at the moment.'
            })
        }} className="btn">
            <i className="bi bi-google"></i> Login with Google
        </GoogleButton>
        <FBButton href="javascript:void(0)" onClick={()=>{
            Toast.fire({
                icon: 'error',
                title: 'Unable to register at the moment.'
            })
        }} className="btn mt-2">
            <i className="bi bi-facebook"></i> Login with Facebook
        </FBButton>
    </form>
  )
}