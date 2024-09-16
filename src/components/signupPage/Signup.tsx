import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Signup.css'; // Import your CSS file for styling

interface UserInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}



function Signup() {
  const [user, setUser] = useState<UserInput>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setsuccessMessage] = useState<string | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Prevent default form submission behavior

    // Basic input validation (optional, consider a more robust library)
    if (!user.name || !user.email || !user.password || !user.confirmPassword || !user.role) {
      setError('Please fill out all fields.');
      return; // Exit the function if validation fails
    }

    if (user.password !== user.confirmPassword) {
      setError('Passwords do not match.');
      return; // Exit the function if passwords don't match
    }

    try {
        let url = import.meta.env.VITE_Base_Url || "http://localhost:3000"
        url = url + "/bo/apis/user/"
      const response = await axios.post(url, 
        user
      );
      setsuccessMessage(response.data?.message || 'User Added')
      // Handle successful signup (e.g., redirect to a confirmation page)
      console.log('Signup successful:', response.data); // Or redirect
    } catch (error: any) {
      // Handle errors (e.g., display error message to the user)
      console.error('Signup error:', error);
      setError(error.response?.data?.message || 'An error occurred during signup.'); // More user-friendly error message
    }
  }

  return (
    <div className="signup">
      <div className="signup-form">
        <h1>Signup</h1>
        <form action="POST" className="signup-form" onSubmit={submit}>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Name"
            name="name"
            id="name"
            value={user.name}
            required // Add required attribute for basic validation
          />
          <input
            type="email"
            onChange={handleChange}
            placeholder="Email"
            name="email"
            id="email"
            value={user.email}
            required
          />
          <input
            type="password"
            onChange={handleChange}
            placeholder="Password"
            name="password"
            id="password"
            value={user.password}
            required
          />
          <input
            type="password"
            onChange={handleChange}
            placeholder="Confirm Password"
            name="confirmPassword"
            id="confirm-password"
            value={user.confirmPassword}
            required
          />
          <input
            type="text"
            onChange={handleChange}
            placeholder="Role"
            name="role"
            id="role"
            value={user.role}
            required
          />

          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <button type="submit" className="signup-bt">
            Signup
          </button>
        </form>
        <br />
        <p>OR</p>
        <br />
        <Link to="/" className="login-link">Login Page</Link>
      </div>
    </div>
  );
}

export default Signup;
