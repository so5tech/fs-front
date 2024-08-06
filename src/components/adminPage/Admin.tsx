import { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css'
import UserComp from '../userUI/UserList';

interface User {
    id: number;
    name: string;
    email: string;
    address: string;
    created_on: string;
    role: string;
    is_delete: boolean;
    // Add other user properties as needed
}

const UserList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        try {
            let url = import.meta.env.VITE_Base_Url? import.meta.env.VITE_Base_Url : "https://project1-9vsw.onrender.com"
            url = url + "/bo/apis/user/"
            const response = await axios.get(url);
            setUsers(response.data.data);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

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
                <UserComp key={eleuser.id} user={eleuser}  onRefresh={handleRefresh} />
            ))}
        </div>
    );
};

export default UserList;
