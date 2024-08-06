import { useState, useEffect } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import './Login.css'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const [user, setUser] = useState(localStorage.getItem("user"));
    useEffect(() => {
        if (user) {        
            navigate("/home", { replace: true });          
        }
      }, [navigate, user]);

    async function submit(e: any) {
        e.preventDefault();

        try {
            let url = import.meta.env.VITE_Base_Url ? import.meta.env.VITE_Base_Url : "https://project1-9vsw.onrender.com"
            url = url + "/bo/apis/auth/login"
            const res = await axios.post(url, {
                email, password
            })
            if (res.status === 200) {
                const user = {
                    id: res.data.data.user._id,
                    email: res.data.data.user.email,
                    name: res.data.data.user.name,
                    token: res.data.data.token
                }
                localStorage.setItem("user", JSON.stringify(user));
                setUser(JSON.stringify(user)); // Update the state to trigger useEffect

            }
        }
        catch (e) {
            console.log(e)
        }
    }


    return (
        <div className="login ">
            <div className="rect">
                <h1 >Login</h1>
                <form action="POST">
                    <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" name='' id='' />
                    <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" name='' id='' />

                    <button className="submit-bt" onClick={submit}>Login</button>
                </form>
                <br />
                <p>OR</p>
                <br />
                <Link className="signup-link" to="/signup">Signup Page</Link>
            </div>
        </div>

    )
}

export default Login

