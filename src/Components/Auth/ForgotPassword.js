import React, {useState, useEffect} from 'react'
import {auth} from '../../firebase'
import { useSelector } from 'react-redux'
import {toast} from 'react-toastify'
import { LoadingOutlined } from '@ant-design/icons';

const ForgotPassword = ({history}) => {
    const [email, setEmail] = useState('')
    const [loading, setloading] = useState(false);

    const {user} = useSelector((state )=> ({ ...state}))

    useEffect(() => {
        if(user && user.token)
        history.push('/')
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setloading(true)

        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            //allow a user to complete new password on only one device
            handleCodeInApp: true
        }

        await auth.sendPasswordResetEmail(email, config)
            .then (() => {
                setEmail('')
                setloading(false)
                toast.success("Check your email for password reset link")
            }).catch((err) => {
                setloading(false)
                toast.error(err.message)

            })
    }

    return (
        <div className="container col-md-6 offset p-5">
            {loading ? (
            <h4 className="text-danger">{<LoadingOutlined />}</h4>
            ) : (
            <h4>Forgot Password</h4>
            )}

            <form onSubmit={handleSubmit}>
                <input 
                type="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Type your email"
                autoFocus
                />
                < br/>
                <button className="btn btn-raisedd"
                disabled={!email}>
                    Submit    
                </button>

            </form>
        </div>
    )
}

export default ForgotPassword