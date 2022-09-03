import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { UserInfo } from "firebase/auth";
import userService from "../../../server/service/UserService";
import User, {NullUser} from '../../../server/models/User';
import OverlayLoader from '../../../components/Loaders/OverlayLoader';

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
                console.error("APP: User was not found.")
            }else{
                if(res.length > 1){
                    console.error("APP: Multiple instance of uid detected");
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
    <form className="form-horizontal">
        <div className="form-group row">
            <label htmlFor="inputName" className="col-sm-2 col-form-label">First Name</label>
            <div className="col-sm-10">
            <input type="email" className="form-control" id="inputName" placeholder="Name" value={user.firstName} disabled/>
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="inputName" className="col-sm-2 col-form-label">Last Name</label>
            <div className="col-sm-10">
            <input type="email" className="form-control" id="inputName" placeholder="Name" value={user.lastName} disabled/>
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
            <input type="email" className="form-control" placeholder="Email" value={currentUser.email} disabled/>
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="inputExperience" className="col-sm-2 col-form-label">Profile URL</label>
            <div className="col-sm-10">
            <textarea className="form-control" placeholder="Photo URL" value={currentUser.photoURL} disabled></textarea>
            </div>
        </div>

        <div className="form-group row">
            <div className="offset-sm-2 col-sm-10">
            <button type="submit" className="btn btn-danger disabled">Update Profile</button>
            </div>
        </div>
    </form>
  )
}
