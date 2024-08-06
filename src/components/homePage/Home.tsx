// import { add, format} from "date-fns"
import React from 'react';
import TimeSeriesInput from '../../Input/TimeSerisInput';
import '../../App.css'
import './Home.css'
// import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import AuthContext from '../auth/AuthContext';
// import useAuth from '../auth/useAuth';
import { useNavigate } from "react-router-dom";



const Home: React.FC = () => {

  const [UrlPathValue, setUrlPathValue] = useState('');
  const [user, setUser] = useState({ name: "" });
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
      } else if (UrlPathValue && UrlPathValue.split("/")[1] === "") {
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


  return (
    <>
      <button className='logout-bt' onClick={Logout}>Logout</button>
      <button className='admin-bt' onClick={Admin}>Admin</button>

      {/* <div className="center-flex"><p>Electricity Theft Detection In Smart Grid</p><p>Hello {location.state.id} , Welcome!</p></div> */}
      <div className="center-flex"><p>Electricity Theft Detection In Smart Grid.</p><p>&nbsp;Hello {user.name}, Welcome!</p>
      </div>

      <img className="responsive-image" src={`../../public/image1.jpg`} alt="Example" />
      <div className="App">
        <h1>Time Series Data Input</h1>
        <TimeSeriesInput />
      </div>
    </>
  );
}



export default Home;
