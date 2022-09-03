/**
 * Component Protection
 *  - used to check current email of the logged in user and shows the component / page if it is valid.
 * 
 * CREATED: 20220903 - adzz
 * UPDATED: 20220903 - adzz
 */
import { useAuth } from "../../contexts/AuthContext";

const SUPER_USER_EMAIL = process.env.REACT_APP_SUPER_USER_EMAIL;
export default function ProtectedComponent(props){
    const { currentUser } = useAuth();
    if(currentUser){
        return (currentUser.email === SUPER_USER_EMAIL ? props.children : (props.fallback ? props.fallback : null))
    }
    return null;
}

/**
 * TODO:
 *  - Make this extensible, add props instead of hardcoded values ( for user and attribute to check ( email ))
 */