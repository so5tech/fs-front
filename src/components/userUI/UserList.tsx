import axios from 'axios';
import React from 'react';
import './userList.css';

interface UserProps {
  user: {
    id: number;
    name: string;
    email: string;
    address: string;
    created_on: string; // Changed to Date type for proper formatting
    role: string;
    is_delete: boolean;
  };
  onRefresh: () => void;
}

const UserComp: React.FC<UserProps> = ({ user, onRefresh }) => {
//   const userStyle = {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: '10px',
//     backgroundColor: '#f0f0f0', // lighter background color for better readability
//     margin: '5px 0',
//     borderRadius: '5px', // add some border radius for a smoother look
//   };
  const user_data:any = localStorage.getItem("user");
  const token = JSON.parse(user_data).token;
  const handleRejectUser = async (user: any) => {
    try{
        console.log('Rejected user:', user);
            let url = import.meta.env.VITE_Base_Url ? import.meta.env.VITE_Base_Url : "https://project1-9vsw.onrender.com"
            url = url + `/bo/apis/user/softDelete/${user._id}`
        const response = await axios.post(url, 
            user,
            {headers: { Authorization: `Bearer ${token}`}}
          );
          console.log('User Rejected successfully:', response.data);
          onRefresh();

    } catch(error: any) {
        console.log('Error Rejecting user');
    }
    
  };

  const handleAcceptUser = async (user: any) => {
    try{
        console.log('Selected user:', user);
        let url = import.meta.env.VITE_Base_Url ? import.meta.env.VITE_Base_Url : "https://project1-9vsw.onrender.com"
            url = url + `/bo/apis/user/accept/${user._id}`
        const response = await axios.post(url , 
            user,
            {headers: { Authorization: `Bearer ${token}`}}
          );
          console.log('User Accept successfully:', response.data);
          onRefresh();

    } catch(error: any) {
        console.log('Error Accepting user');
    }
    
  };

  const userClass = user.is_delete ? 'userList-inactive' : 'userList-active';

  return (
    <div className={`user-detail ${userClass}`}>
      <div  className='userList'>
        <span><strong>ID:</strong> {user.id}</span>
        <span><strong>Name:</strong> {user.name}</span>
      </div>
      <div className='userList'>
        <span><strong>Email:</strong> {user.email}</span>
        <span><strong>Address:</strong> {"user.address"}</span> 
      </div>
      <div className='userList'>
        <span><strong>Created On:</strong> {user.created_on}</span>  {/* Format date */}
        <span><strong>Role:</strong> {user.role}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
        <button type="button" onClick={() => handleRejectUser(user)} style={{ marginRight: '10px' }}>Reject User</button>
        <button type="button" onClick={() => handleAcceptUser(user)}>Accept User</button> {/* Changed button text */}
      </div>
    </div>
  );
};

export default UserComp;
