import React from 'react'
import './Login.css'

import { Button } from "@material-ui/core"
import { auth, provider } from '../firebase'
import { useStateValue } from '../StateProvider'
import { actionTypes } from '../reducer'

function Login() {
    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth
        .signInWithPopup(provider)
        .then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            })
        }) 
        .catch((error) => alert(error.message))
    };

    return (
        <div className="login">
            <div className="login__container">
                <img
                    src="https://www.creativefabrica.com/wp-content/uploads/2018/12/Chat-icon-by-rudezstudio-11-580x386.jpg"
                    alt=""
                />
                <div className="login__text">
                    <h1>Sign in to Chat App</h1>
                </div>

                <Button onClick={signIn}>
                    Sign in with Google
                </Button>
            </div>
        </div>
    )
}

export default Login
