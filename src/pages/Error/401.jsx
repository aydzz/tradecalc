import { useEffect } from "react";
import {Toast} from "../../assets/theme/utils/swal";

export default function Error401() {
  return (
      <div className="content-wrapper m-0" style={{height:"100vh"}}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>401 Error</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">401 Error Page</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="error-page">
            <h2 className="headline text-warning">401</h2>
            <div className="error-content">
              <h3>
                <i className="fas fa-exclamation-triangle text-warning"></i> Unauthorized
              </h3>
              <p>
                You are currently unable to access this page. . Meanwhile, you may  <a href="/home">return to home page</a> or try using the search form.
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

export function Error401Private() {
  return (
      <div className="wrapper">
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>401 Error</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">401 Unauthorized</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="error-page">
            <h2 className="headline text-warning">401</h2>
            <div className="error-content">
              <h3>
                <i className="fas fa-exclamation-triangle text-warning"></i>Unauthorized
              </h3>
              <p>
                You are currently unable to access this page. Meanwhile, you may <a href="/app/dashboard">return to home page</a> or try using the search form.
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
      </div>
  );
}
