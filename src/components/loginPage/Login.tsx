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

    // async function submit(e: any) {
    //     e.preventDefault();

    //     try {
    //         let url = import.meta.env.VITE_Base_Url || "http://localhost:3000";
    //         url = url + "/bo/apis/auth/login";
    //         const res = await axios.post(url, {
    //             email,
    //             password
    //         });

    //         if (res.status === 200) {
    //             const userData = res.data.data;
    //             userData.user['token'] = userData.btoken;
    //             delete userData.btoken;

    //             localStorage.setItem("user", JSON.stringify(userData));
    //             setUser(JSON.stringify(userData)); // Set the newly logged-in user
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
    async function submit(e?: React.FormEvent<HTMLFormElement>) { // Make e optional
        if (e) e.preventDefault(); // Prevent default behavior if e is provided

        try {
            let url = import.meta.env.VITE_Base_Url || "http://localhost:3000";
            url = url + "/bo/apis/auth/login";
            const res = await axios.post(url, {
                email: email || defaultEmail, // Use default email if state is empty
                password: password || defaultPassword // Use default password if state is empty
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
    const defaultEmail = 'demo@gmail.com'; // Set your default email
    const defaultPassword = '1234'; // Set your default password
    const loginWithDefaults = async () => {
        setEmail(defaultEmail); // Set the email to default
        setPassword(defaultPassword); // Set the password to default
        await submit(); // Call the submit function to log in
    };

    return (
        <div className="login flex justify-center items-center h-screen w-screen bg-[#85ad9d] fixed top-0 left-0">
            <div className="rect bg-[#cfeae7] shadow-lg rounded-lg p-6 flex flex-col items-center">
                <h1 className="text-2xl text-green-800 mb-4">Login</h1>
                <form onSubmit={submit} className="w-full">
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        className="submit-bt w-32 bg-purple-500 text-white py-2 rounded hover:bg-purple-700 transition duration-200"
                        type="submit"
                    >
                        Login
                    </button>

                </form>
                <br />
                <button className="skip-login w-32 bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition duration-200" onClick={loginWithDefaults}>
                    Skip Login
                </button>
                <br />
                <p>OR</p>
                <br />
                <Link className="signup-link" to="/signup">Signup Page</Link>
            </div>
        </div>
    );
}

export default Login;
