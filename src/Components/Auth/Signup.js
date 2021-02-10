import React, {useState} from 'react'
import {auth} from '../../firebase'

//toast 
import {toast} from 'react-toastify'




const Signup = () => {
    // When a user types in the input feild, the value needs to be saved in state
    const [email, setEmail] = useState("");
    
    // Form function 
    const handleSubmit = async (e) => {
        e.preventDefault()
        // object with the link to take a user to the next page 
        //to complete their registration
        const config = {
            url: process.env.REACT_APP_SIGNUP_REDIRECT_URL,
            //allow a user to complete registration on only one device
            handleCodeInApp: true
        }
        await auth.sendSignInLinkToEmail(email,config);
        toast.success(
            `Email is sent to ${email}. Click the link to complete your registration`
            );
       // save user email in local storage
        window.localStorage.setItem('emailForRegistration', email)

        //clear state
        setEmail("");      
    }
   

    const signUpForm = () => <
        form onSubmit={handleSubmit}>
            <input 
            type="email" 
            className="form-control" 
            onChange={e => setEmail(e.target.value)} 
            value={email} 
            autoFocus/>

            <button type="submit" className=" btn btn-raised">
            Sign Up</button>
        </form>

    return (
        <div className="container p-5">
            <div className="row">
                <div className= "col-md-6.offset-md-3">
                    <h3>SignUp</h3>
                    
                    {signUpForm()}
                </div>
            </div>
        </div>
    )
}

export default Signup