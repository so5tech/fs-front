// import { add, format} from "date-fns"
import React from 'react';
// import TimeSeriesInput from '../Input/TimeSerisInput';
import '../../App.css'
import './Home.css'
// import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import AuthContext from '../auth/AuthContext';
// import useAuth from '../auth/useAuth';
import { useNavigate } from "react-router-dom";



const Home: React.FC = () => {

  const [UrlPathValue, setUrlPathValue] = useState('');
  const [user, setUser] = useState({ user: { name: "" } });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  React.useEffect(() => {
    if (user) {
      if (UrlPathValue && UrlPathValue.split("/")[1] === "admin") {
        navigate(UrlPathValue, { replace: true });
      } else if (UrlPathValue && UrlPathValue.split("/")[1] === "edt") {
        navigate(UrlPathValue, { replace: true });
      } else if (UrlPathValue && UrlPathValue.split("/")[1] === "inventory") {
        navigate(UrlPathValue, { replace: true });
      }
      else if (UrlPathValue && UrlPathValue.split("/")[1] === "shophome") {
        navigate(UrlPathValue, { replace: true });
      }
      else if (UrlPathValue && UrlPathValue.split("/")[1] === "") {
        navigate(UrlPathValue, { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
    }
    else {
      navigate("/", { replace: true });
    }
  }, [navigate, user, UrlPathValue]);
  // Add functionality which will send user to else 
  async function Logout(e: any) {
    e.preventDefault();
    try {
      localStorage.removeItem('user');
      setUrlPathValue("/")
    }
    catch (e) {
      console.log(e)
    }
  }

  async function Admin(e: any) {
    e.preventDefault();
    try {
      setUrlPathValue("/admin")
    }
    catch (e) {
      console.log(e)
    }
  }

  async function EDT(e: any) {
    e.preventDefault();
    try {
      setUrlPathValue("/edt")
    }
    catch (e) {
      console.log(e)
    }
  }
  async function shop(e: any) {
    e.preventDefault();
    try {
      setUrlPathValue("/shophome")
      // navigate("/inventory", { replace: true });
    }
    catch (e) {
      console.log(e)
    }
  }

  console.log(user.user.name);

  return (
    <div className="home-page">
      <button className='logout-bt' onClick={Logout}>Logout</button>
      <button className='admin-bt' onClick={Admin}>Admin</button>
      <button className='edt-bt' onClick={EDT}>EDT</button>
      <div className="button-wrapper">
        <button className="inv-bt" onClick={shop}>Shop</button>
      </div>



      {/* <!-- Shooting stars background --> */}
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>





      {/* <div className="center-flex"><p>Electricity Theft Detection In Smart Grid</p><p>Hello {location.state.id} , Welcome!</p></div> */}
      {/* <div className="center-flex"><p>Electricity Theft Detection In Smart Grid.</p><p>&nbsp;Hello {user.user.name}, Welcome!</p>
      </div>

      <img className="responsive-image" src="https://plus.unsplash.com/premium_photo-1716565030772-35240a4de4a4?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="This Project is ment for detecting manupulated data using pattern." />
      <div className="t-text">
        <h1>Time Series Data Input</h1>
        <TimeSeriesInput />
      </div> */}
    </div>
  );
}



export default Home;
