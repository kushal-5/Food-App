import React, { useState, useContext } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'

const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken } = useContext(StoreContext)
    const navigate = useNavigate()
    const [currState, setCurrState] = useState("Login");
    const [isAdmin, setIsAdmin] = useState(false);

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }
    // useEffect(()=>{
    //     console.log(data)
    // },[data])
    const onLogin = async (e) => {
        e.preventDefault()

        let new_url = url;
        if (isAdmin) {
            new_url += "/api/admin/login";
        } else if (currState === "Login") {
            new_url += "/api/user/login";
        } else {
            new_url += "/api/user/register"
        }

        try {
            const response = await axios.post(new_url, data);
            if (response.data.success) {
                setToken(response.data.token)
                localStorage.setItem("token", response.data.token)
                // loadCartData({token:response.data.token})
                setShowLogin(false)
                
                if (isAdmin) {
                    navigate('/admin')
                }
            } else {
                alert(response.data.message)
            }
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred")
        }
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{isAdmin ? "Admin Login" : currState}</h2> 
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Sign Up" && !isAdmin ? 
                        <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required /> 
                        : <></>
                    }
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
                </div>
                <button>{isAdmin ? "Admin Login" : (currState === "Login" ? "Login" : "Create account")}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" name="" id="" required/>
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
                <div className="login-popup-options">
                    {!isAdmin && (
                        currState === "Login"
                            ? <p>Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span></p>
                            : <p>Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span></p>
                    )}
                    <p className="admin-toggle">
                        {isAdmin 
                            ? <span onClick={() => setIsAdmin(false)}>User Login</span>
                            : <span onClick={() => setIsAdmin(true)}>Admin Login</span>
                        }
                    </p>
                </div>
            </form>
        </div>
    )
}

export default LoginPopup
