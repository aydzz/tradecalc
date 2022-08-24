import { Link } from "react-router-dom";
import { useEffect } from "react";
import {Toast} from "../../assets/theme/utils/swal";

export default function Error404() {
  return (
      <div className="content-wrapper m-0" style={{height:"100vh"}}>
        <section className="content-header">
          {/* <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Page not Found</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">404 Error Page</li>
                </ol>
              </div>
            </div>
          </div> */}
        </section>
        <section className="content">
          <div className="error-page">
            <h2 className="headline text-warning"> 404</h2>
            <div className="error-content">
              <h3>
                <i className="fas fa-exclamation-triangle text-warning"></i> Oops! Page not found.
              </h3>
              <p>
                We could not find the page you were looking for. Meanwhile, you may <Link to="/app/dashboard">return to dashboard</Link> or try using the search form.
              </p>
              <form className="search-form">
                <div className="input-group">
                  <input type="text" name="search" className="form-control" placeholder="Search" disabled/>

                  <div className="input-group-append">
                    <button type="submit" name="submit" className="btn btn-warning" disabled>
                      <i className="bi bi-search"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
  );
}

export function Error404Private() {
  useEffect(function(e){
    Toast.fire({
      icon:"error",
      title:"Oops, this page cannot be found!",
      timer:4000,
      timerProgressBar:true
    })
  },[])
  return (
      <div className="wrapper">
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Page not Found</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">404 Error Page</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="error-page">
            <h2 className="headline text-warning"> 404</h2>
            <div className="error-content">
              <h3>
                <i className="fas fa-exclamation-triangle text-warning"></i> Oops! Page not found.
              </h3>
              <p>
                We could not find the page you were looking for. Meanwhile, you may <Link to="/app/dashboard">return to dashboard</Link> or try using the search form.
              </p>
              <form className="search-form">
                <div className="input-group">
                  <input type="text" name="search" className="form-control" placeholder="Search" />

                  <div className="input-group-append">
                    <button type="submit" name="submit" className="btn btn-warning">
                      <i className="bi bi-search"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
      </div>
  );
}
