import React, {useState, useEffect} from 'react'
import {auth} from '../../firebase'

//toast 
import {toast} from 'react-toastify'




const SignupComplete = ({history}) => {
    // When a user types in the input feild, the value needs to be saved in state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    useEffect(() => {
        setEmail(window.localStorage.getItem("emailForRegistration"))
   
    }, [])

    // Form function 

    const handleSubmit = async (e) => {
        e.preventDefault()
        //validation
        if(!email || !password) {
            toast.error('Email and password is required')
            return;
        }

        if(password.length < 6) {
            toast.error('Password must be at least 6 character')
            return;
        } 


        try {
            const result = await auth.signInWithEmailLink(email, window.location.href );
            // console.log("Result", result);
            // How it works log the user with email link then email that existing email from local storage
            // then update that user with password
            //
            if(result.user.emailVerified) {
                // remove user email from local storage
                window.localStorage.removeItem("emailForRegistration")
                // get user id  token
                let user = auth.currentUser
                await user.updatePassword(password)
                const idTokenResult = await user.getIdTokenResult()
                // redux store
                console.log("user", user, "idTokenResult ")
                //redirect
                history.push('/')
            }
        } 
        catch(error) {
            console.log(error)
            toast.error(error.message)
        }
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