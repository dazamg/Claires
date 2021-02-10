import React, {useState, useEffect} from 'react'
import {auth} from '../../firebase'

//toast 
import {toast} from 'react-toastify'




const SignupComplete = ({history}) => {
    // When a user types in the input feild, the value needs to be saved in state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    useState(() => {
        setEmail(window.localStorage.getItem("emailForRegistration"))
    }, [])

    // Form function 
    const handleSubmit = async (e) => {
        e.preventDefault()
        // object with the link to take a user to the next page 
        //to complete their registration
          
    }
   

    const completeSignUpForm = () => <
        form onSubmit={handleSubmit}>
            <input 
            type="email" 
            className="form-control" 
            value={email} 
            disabled/>

            <input 
            type="password" 
            className="form-control" 
            value={password} 
            onChange={(e) => setPassword(e.target.value) }
            placeholder="Password"
            autofocus/>

            <button type="submit" className=" btn btn-raised">
            Complete Sign Up </button>
        </form>

    return (
        <div className="container p-5">
            <div className="row">
                <div className= "col-md-6.offset-md-3">
                    <h3>SignUp Complete</h3>
                    
                    {completeSignUpForm()}
                </div>
            </div>
        </div>
    )
}

export default SignupComplete