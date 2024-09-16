import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [user, setUser] = useState(localStorage.getItem("user"));

    useEffect(() => {
        if (user != null) {
            const parsedUser = JSON.parse(user);

            if (parsedUser?.user?.type === 'consumer') {    
                console.log("Redirecting to shop home...");
                navigate("/shophome", { replace: true });          
            } else if (parsedUser) {
                console.log("Redirecting to home...");
                navigate("/home", { replace: true });
            }
        }
    }, [navigate, user]);

    async function submit(e: any) {
        e.preventDefault();

        try {
            let url = import.meta.env.VITE_Base_Url || "http://localhost:3000";
            url = url + "/bo/apis/auth/login";
            const res = await axios.post(url, {
                email,
                password
            });

            if (res.status === 200) {
                const userData = res.data.data;
                userData.user['token'] = userData.btoken;
                delete userData.btoken;

                localStorage.setItem("user", JSON.stringify(userData));
                setUser(JSON.stringify(userData)); // Set the newly logged-in user

                // Now user state is updated and will trigger the correct redirect
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="login">
            <div className="rect">
                <h1>Login</h1>
                <form action="POST">
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button className="submit-bt" onClick={submit}>Login</button>
                </form>
                <br />
                <p>OR</p>
                <br />
                <Link className="signup-link" to="/signup">Signup Page</Link>
            </div>
        </div>
    );
}

export default Login;
