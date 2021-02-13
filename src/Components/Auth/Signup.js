import React, {useState, useEffect} from 'react'
import {auth} from '../../firebase'
import { useSelector } from 'react-redux'

//toast 
import {toast} from 'react-toastify'




const Signup = ({history}) => {
    // When a user types in the input feild, the value needs to be saved in state
    const [email, setEmail] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("ENV --->", process.env.REACT_APP_REGISTER_REDIRECT_URL);
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is sent to ${email}. Click the link to complete your registration.`
    );
    // save user email in local storage
    window.localStorage.setItem("emailForRegistration", email);
    // clear state
    setEmail("");
  };
   

    const signUpForm = () => <
        form onSubmit={handleSubmit}>
            <input 
            type="email" 
            className="form-control" 
            onChange={e => setEmail(e.target.value)} 
            placeholder="Enter Email"
            value={email} 
            autoFocus/>

            <br />
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