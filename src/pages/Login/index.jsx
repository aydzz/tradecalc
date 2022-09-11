import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import breakpoints from "../../assets/theme/base/breakpoints";
import LoginForm from "./LoginForm";
import { Toast } from '../../assets/theme/utils/swal';
import photo from "../../assets/img/photo1.png"


const LoginImage = styled.div`
  /* background: url(https://source.unsplash.com/Mv9hjnEUHR4/600x800); */
  background: url(${photo});
  background-position: center;
  background-size: cover;
`;

const Container = styled.div`
  @media (min-width: ${breakpoints.values.xxl}px) {
    max-width: 60% !important;
  }
`;

export default function LoginIndex() {
  useEffect(function () {
    document.querySelector("body").classList.add("bg-default");
    return () => {
      document.querySelector("body").classList.remove("bg-default");
    };
  }, []);

  
  return (
    <Container className="container">
      <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
          <div className="row" style={{ minHeight: "650px" }}>
            <LoginImage className="col-lg-5 d-none d-lg-block"></LoginImage>
            <div className="col-lg-7">
              <div className="p-5 my-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                </div>
                {/* Registration Form */}
                <LoginForm></LoginForm>
                <hr />
                <div className="text-center">
                  <a className="small" href="forgot-password">
                    Forgot Password?
                  </a>
                </div>
                <div className="text-center">
                  <a className="small" href="register">
                    Create an Account
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
