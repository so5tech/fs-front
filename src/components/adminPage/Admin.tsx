import { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';
import UserComp from '../userUI/UserList';

interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  created_on: string;
  role: string;
  is_delete: boolean;
  token: string;
  // Add other user properties as needed
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
//   const [user, setUser] = useState<User | null>(JSON.parse(localStorage.getItem("user")).user);
  const [user] = useState<User | null>(
    (JSON.parse(localStorage.getItem("user") as string) || {}).user as User | null
  );


  const fetchUsers = async () => {
    try {
        console.log("calling")
      const baseUrl = import.meta.env.VITE_Base_Url || "http://localhost:3000";
      const url = `${baseUrl}/bo/apis/user/`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${user?.token}` }
      });

      setUsers(response.data.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("colling from hererljd", user)
    fetchUsers();
  }, [user, user?.token]); // Empty dependency array ensures this runs once on mount

  const handleRefresh = () => {
    fetchUsers();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>User List</h2>
      <div className="name-strip">
        <span>User Name</span>
        <span>CreatedAt</span>
        <span>Role</span>
      </div>

      {users.map((eleuser) => (
        <UserComp
          key={eleuser.id}
          user={eleuser}
          onRefresh={handleRefresh}
          token={user?.token ?? ''}
        />
      ))}
    </div>
  );
};

export default UserList;
