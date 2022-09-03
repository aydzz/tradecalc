import React from 'react'
import s from "./assets/css/styles.module.css";
import showcase1 from "./assets/img/tra-bg-showcase-1.jpg"
import showcase2 from "./assets/img/tra-bg-showcase-2.jpg"
import showcase3 from "./assets/img/tra-bg-showcase-3.jpg"
import {classNames} from "../../assets/js/Functions"


export default function LandingIndex() {
classNames.prototype.cssModule = s
  return (
    <>
        <nav className={classNames("navbar navbar-light bg-light static-top")}>
            <div className={classNames("container")}>
                <a className={classNames("navbar-brand")} href="#!">Trading Assistant</a>
                <a className={classNames("btn btn-primary")} href="register">Sign Up</a>
            </div>
        </nav>
      
        <header className={classNames("masthead")}>
            <div className={classNames("container position-relative")}>
                <div className={classNames("row justify-content-center")}>
                    <div className={classNames("col-xl-6")}>
                        <div className={classNames("text-center text-white")}>
                          
                            <h1 className={classNames("mb-5") + " text-light"}>Trade Smarter with Trading assistant.</h1>
                            
                            <form className={classNames("form-subscribe")} id="contactForm" data-sb-form-api-token="API_TOKEN">
                               
                                <div className={classNames("row")}>
                                    <div className={classNames("col")}>
                                        <input className={classNames("form-control form-control-lg")} id="emailAddress" type="email" placeholder="Email Address" data-sb-validations="required,email" />
                                        <div className={classNames("invalid-feedback text-white")} data-sb-feedback="emailAddress:required">Email Address is required.</div>
                                        <div className={classNames("invalid-feedback text-white")} data-sb-feedback="emailAddress:email">Email Address Email is not valid.</div>
                                    </div>
                                    <div className={classNames("col-auto")}><button className={classNames("btn btn-primary btn-lg disabled")} id="submitButton" type="submit">Submit</button></div>
                                </div>
                               
                                <div className="d-none" id="submitSuccessMessage">
                                    <div className={classNames("text-center mb-3")}>
                                        <div className={classNames("fw-bolder")}>Form submission successful!</div>
                                        <p>To activate this form, sign up at</p>
                                        <a className={classNames("text-white")} href="/">Trading Assistant</a>
                                    </div>
                                </div>
                               
                                <div className="d-none" id="submitErrorMessage"><div className={classNames("text-center text-danger mb-3")}>Error sending message!</div></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </header>
       
        <section className={classNames("features-icons bg-light text-center")}>
            <div className={classNames("container")}>
                <div className={classNames("row")}>
                    <div className={classNames("col-lg-4")}>
                        <div className={classNames("features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3")}>
                            <div className={classNames("features-icons-icon d-flex")}><i className={"bi bi-calculator m-auto text-primary"}></i></div>
                            <h3>Trade Calculator</h3>
                            <p className={classNames("lead mb-0")}>Calculate trade risks using our Trade Calculator.</p>
                        </div>
                    </div>
                    <div className={classNames("col-lg-4")}>
                        <div className={classNames("features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3")}>
                            <div className={classNames("features-icons-icon d-flex")}><i className={"bi bi-journal m-auto text-primary"}></i></div>
                            <h3>Journal</h3>
                            <p className={classNames("lead mb-0")}>Log your trades with our simplistic trade journal.</p>
                        </div>
                    </div>
                    <div className={classNames("col-lg-4")}>
                        <div className={classNames("features-icons-item mx-auto mb-0 mb-lg-3")}>
                            <div className={classNames("features-icons-icon d-flex")}><i className={"bi bi-graph-up m-auto text-primary"}></i></div>
                            <h3>Analytics</h3>
                            <p className={classNames("lead mb-0")}>Analyze your performance with our charts.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
 
        <section className={classNames("showcase")}>
            <div className={classNames("container-fluid p-0")}>
                <div className={classNames("row g-0")}>
                    <div className={classNames("col-lg-6 order-lg-2 text-white showcase-img")} style={{backgroundImage: `url('${showcase1}')`}}></div>
                    <div className={classNames("col-lg-6 order-lg-1 my-auto showcase-text")}>
                        <h2>Advanced Trading Calculator</h2>
                        <p className={classNames("lead mb-0")}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit nisi debitis repellat impedit nobis repellendus, autem error porro distinctio cum quo aliquam ad blanditiis eligendi quidem unde sed dolores beatae.</p>
                    </div>
                </div>
                <div className={classNames("row g-0")}>
                    <div className={classNames("col-lg-6 text-white showcase-img")} style={{backgroundImage: `url('${showcase2}')`}}></div>
                    <div className={classNames("col-lg-6 my-auto showcase-text")}>
                        <h2>Market Monitoring</h2>
                        <p className={classNames("lead mb-0")}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni corporis consectetur, ea explicabo in dolorum earum deleniti animi excepturi expedita iure. Eveniet laudantium in nam optio nemo reprehenderit, facere ab.</p>
                    </div>
                </div>
                <div className={classNames("row g-0")}>
                    <div className={classNames("col-lg-6 order-lg-2 text-white showcase-img")} style={{backgroundImage: `url('${showcase3}')`}}></div>
                    <div className={classNames("col-lg-6 order-lg-1 my-auto showcase-text")}>
                        <h2>Reporting and Analytics</h2>
                        <p className={classNames("lead mb-0")}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut quasi, molestiae impedit asperiores mollitia explicabo quidem nostrum excepturi rem officiis quia earum, possimus voluptas dolorum repellat odit labore eos velit!</p>
                    </div>
                </div>
            </div>
        </section>
  
        <section className={classNames("testimonials text-center bg-light")}>
            <div className={classNames("container")}>
                <h2 className={classNames("mb-5")}>What people are saying...</h2>
                <div className={classNames("row")}>
                  {/* TODO: Implement Testimonials from Customer Feedback */}
                    <p className={classNames('lead')}>Nothing much..</p>
                </div>
            </div>
        </section>
     
        <section className={classNames("call-to-action text-white text-center")} id="signup">
            <div className={classNames("container position-relative")}>
                <div className={classNames("row justify-content-center")}>
                    <div className={classNames("col-xl-6")}>
                        <h2 className={classNames("mb-4") + " text-light"}>Ready to get started? Sign up now!</h2>
                        <form className={classNames("form-subscribe")} id="contactFormFooter" data-sb-form-api-token="API_TOKEN">
                           
                            <div className={classNames("row")}>
                                <div className={classNames("col")}>
                                    <input className={classNames("form-control form-control-lg")} id="emailAddressBelow" type="email" placeholder="Email Address" data-sb-validations="required,email" />
                                    <div className={classNames("invalid-feedback text-white")} data-sb-feedback="emailAddressBelow:required">Email Address is required.</div>
                                    <div className={classNames("invalid-feedback text-white")} data-sb-feedback="emailAddressBelow:email">Email Address Email is not valid.</div>
                                </div>
                                <div className={classNames("col-auto")}><button className={classNames("btn btn-primary btn-lg disabled")} id="submitButton" type="submit">Submit</button></div>
                            </div>
                            <div className={classNames("d-none")} id="submitSuccessMessage">
                                <div className={classNames("text-center mb-3")}>
                                    <div className={classNames("fw-bolder")}>Form submission successful!</div>
                                    <p>To activate this form, sign up at</p>
                                    <a className={classNames("text-white")} href="/">Trading Assistant</a>
                                </div>
                            </div>
                            <div className={classNames("d-none")} id="submitErrorMessage"><div className={classNames("text-center text-danger mb-3")}>Error sending message!</div></div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        <footer className={classNames("footer bg-light")}>
            <div className={classNames("container")}>
                <div className={classNames("row")}>
                    <div className={classNames("col-lg-6 h-100 text-center text-lg-start my-auto")}>
                        <ul className={classNames("list-inline mb-2")}>
                            <li className={classNames("list-inline-item")}><a href="#!">About</a></li>
                            <li className={classNames("list-inline-item")}>⋅</li>
                            <li className={classNames("list-inline-item")}><a href="#!">Contact</a></li>
                            <li className={classNames("list-inline-item")}>⋅</li>
                            <li className={classNames("list-inline-item")}><a href="#!">Terms of Use</a></li>
                            <li className={classNames("list-inline-item")}>⋅</li>
                            <li className={classNames("list-inline-item")}><a href="#!">Privacy Policy</a></li>
                        </ul>
                        <p className={classNames("text-muted small mb-4 mb-lg-0")}>&copy; Trading Assitant {new Date().getUTCFullYear()}. All Rights Reserved.</p>
                    </div>
                    <div className={classNames("col-lg-6 h-100 text-center text-lg-end my-auto")}>
                        <ul className={classNames("list-inline mb-0")}>
                            <li className={classNames("list-inline-item me-4")}>
                                <a href="#!"><i className={classNames("bi-facebook fs-3")}></i></a>
                            </li>
                            <li className={classNames("list-inline-item me-4")}>
                                <a href="#!"><i className={classNames("bi-twitter fs-3")}></i></a>
                            </li>
                            <li className={classNames("list-inline-item")}>
                                <a href="#!"><i className={classNames("bi-instagram fs-3")}></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    </>
  )
}


/**
 * TODO: Testimonials from Customer Feedbacks
 *  - max 3 | divide using bs col-*
 */