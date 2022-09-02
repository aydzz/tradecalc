import React from 'react'
import "./assets/css/styles.css";
import showcase1 from "./assets/img/tra-bg-showcase-1.jpg"
import showcase2 from "./assets/img/tra-bg-showcase-2.jpg"
import showcase3 from "./assets/img/tra-bg-showcase-3.jpg"



export default function LandingIndex() {
  return (
    <>
        <nav className="navbar navbar-light bg-light static-top">
            <div className="container">
                <a className="navbar-brand" href="#!">Trading Assistant</a>
                <a className="btn btn-primary" href="register">Sign Up</a>
            </div>
        </nav>
      
        <header className="masthead">
            <div className="container position-relative">
                <div className="row justify-content-center">
                    <div className="col-xl-6">
                        <div className="text-center text-white">
                          
                            <h1 className="mb-5">Trade Smarter with Trading assistant.</h1>
                            
                            <form className="form-subscribe" id="contactForm" data-sb-form-api-token="API_TOKEN">
                               
                                <div className="row">
                                    <div className="col">
                                        <input className="form-control form-control-lg" id="emailAddress" type="email" placeholder="Email Address" data-sb-validations="required,email" />
                                        <div className="invalid-feedback text-white" data-sb-feedback="emailAddress:required">Email Address is required.</div>
                                        <div className="invalid-feedback text-white" data-sb-feedback="emailAddress:email">Email Address Email is not valid.</div>
                                    </div>
                                    <div className="col-auto"><button className="btn btn-primary btn-lg disabled" id="submitButton" type="submit">Submit</button></div>
                                </div>
                               
                                <div className="d-none" id="submitSuccessMessage">
                                    <div className="text-center mb-3">
                                        <div className="fw-bolder">Form submission successful!</div>
                                        <p>To activate this form, sign up at</p>
                                        <a className="text-white" href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                                    </div>
                                </div>
                               
                                <div className="d-none" id="submitErrorMessage"><div className="text-center text-danger mb-3">Error sending message!</div></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </header>
       
        <section className="features-icons bg-light text-center">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                            <div className="features-icons-icon d-flex"><i className="bi-calculator m-auto text-primary"></i></div>
                            <h3>Trade Calculator</h3>
                            <p className="lead mb-0">Calculate trade risks using our Trade Calculator.</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                            <div className="features-icons-icon d-flex"><i className="bi-journal m-auto text-primary"></i></div>
                            <h3>Journal</h3>
                            <p className="lead mb-0">Log your trades with our simplistic trade journal.</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                            <div className="features-icons-icon d-flex"><i className="bi-graph-up m-auto text-primary"></i></div>
                            <h3>Analytics</h3>
                            <p className="lead mb-0">Analyze your performance with our charts.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
 
        <section className="showcase">
            <div className="container-fluid p-0">
                <div className="row g-0">
                    <div className="col-lg-6 order-lg-2 text-white showcase-img" style={{backgroundImage: `url('${showcase1}')`}}></div>
                    <div className="col-lg-6 order-lg-1 my-auto showcase-text">
                        <h2>Advanced Trading Calculator</h2>
                        <p className="lead mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit nisi debitis repellat impedit nobis repellendus, autem error porro distinctio cum quo aliquam ad blanditiis eligendi quidem unde sed dolores beatae.</p>
                    </div>
                </div>
                <div className="row g-0">
                    <div className="col-lg-6 text-white showcase-img" style={{backgroundImage: `url('${showcase2}')`}}></div>
                    <div className="col-lg-6 my-auto showcase-text">
                        <h2>Market Monitoring</h2>
                        <p className="lead mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni corporis consectetur, ea explicabo in dolorum earum deleniti animi excepturi expedita iure. Eveniet laudantium in nam optio nemo reprehenderit, facere ab.</p>
                    </div>
                </div>
                <div className="row g-0">
                    <div className="col-lg-6 order-lg-2 text-white showcase-img" style={{backgroundImage: `url('${showcase3}')`}}></div>
                    <div className="col-lg-6 order-lg-1 my-auto showcase-text">
                        <h2>Reporting and Analytics</h2>
                        <p className="lead mb-0">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut quasi, molestiae impedit asperiores mollitia explicabo quidem nostrum excepturi rem officiis quia earum, possimus voluptas dolorum repellat odit labore eos velit!</p>
                    </div>
                </div>
            </div>
        </section>
  
        <section className="testimonials text-center bg-light">
            <div className="container">
                <h2 className="mb-5">What people are saying...</h2>
                <div className="row">
                  {/* TODO: Implement Testimonials from Customer Feedback */}
                    <p className='lead'>Nothing much..</p>
                </div>
            </div>
        </section>
     
        <section className="call-to-action text-white text-center" id="signup">
            <div className="container position-relative">
                <div className="row justify-content-center">
                    <div className="col-xl-6">
                        <h2 className="mb-4">Ready to get started? Sign up now!</h2>
                        <form className="form-subscribe" id="contactFormFooter" data-sb-form-api-token="API_TOKEN">
                           
                            <div className="row">
                                <div className="col">
                                    <input className="form-control form-control-lg" id="emailAddressBelow" type="email" placeholder="Email Address" data-sb-validations="required,email" />
                                    <div className="invalid-feedback text-white" data-sb-feedback="emailAddressBelow:required">Email Address is required.</div>
                                    <div className="invalid-feedback text-white" data-sb-feedback="emailAddressBelow:email">Email Address Email is not valid.</div>
                                </div>
                                <div className="col-auto"><button className="btn btn-primary btn-lg disabled" id="submitButton" type="submit">Submit</button></div>
                            </div>
                            <div className="d-none" id="submitSuccessMessage">
                                <div className="text-center mb-3">
                                    <div className="fw-bolder">Form submission successful!</div>
                                    <p>To activate this form, sign up at</p>
                                    <a className="text-white" href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                                </div>
                            </div>
                            <div className="d-none" id="submitErrorMessage"><div className="text-center text-danger mb-3">Error sending message!</div></div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        <footer className="footer bg-light">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 h-100 text-center text-lg-start my-auto">
                        <ul className="list-inline mb-2">
                            <li className="list-inline-item"><a href="#!">About</a></li>
                            <li className="list-inline-item">⋅</li>
                            <li className="list-inline-item"><a href="#!">Contact</a></li>
                            <li className="list-inline-item">⋅</li>
                            <li className="list-inline-item"><a href="#!">Terms of Use</a></li>
                            <li className="list-inline-item">⋅</li>
                            <li className="list-inline-item"><a href="#!">Privacy Policy</a></li>
                        </ul>
                        <p className="text-muted small mb-4 mb-lg-0">&copy; Trading Assitant {new Date().getUTCFullYear()}. All Rights Reserved.</p>
                    </div>
                    <div className="col-lg-6 h-100 text-center text-lg-end my-auto">
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item me-4">
                                <a href="#!"><i className="bi-facebook fs-3"></i></a>
                            </li>
                            <li className="list-inline-item me-4">
                                <a href="#!"><i className="bi-twitter fs-3"></i></a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#!"><i className="bi-instagram fs-3"></i></a>
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