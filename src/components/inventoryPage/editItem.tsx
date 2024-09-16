import React, { useEffect, useState } from 'react';
import './inventory.css'
import axios from 'axios';
import { EditDataProps, User } from './types';

const EditData: React.FC<EditDataProps> = ({ data, onSave }) => {
    const [editData, setEditData] = useState(data);
    const [currentStock, setCurrentStock] = useState<number>(0); // Add state for current_stock
    const [user] = useState<User | null>(
        (JSON.parse(localStorage.getItem("user") as string) || {}).user as User | null
    );

    const handleInputChange = (index: number, field: string, value: any) => {
        const newData = [...editData.data];
        newData[index][field] = value;
        setEditData({ ...editData, data: newData });
    };

    const handleSave = () => {
        const updatedData = { ...editData, current_stock: currentStock }; // Include current_stock in the data
        onSave(updatedData);
    };

    useEffect(() => {
        let url = import.meta.env.VITE_Base_Url || "http://localhost:3000";
        url = url + "/bo/apis/inventory/";

        const putData = async () => {
            try {
                await axios.put(url, { ...editData, current_stock: currentStock });
            } catch (err) {
                console.log("error updating item", err);
            }
        };
        putData();

    }, [editData, currentStock]); // Add currentStock to the dependency array

    return (
        <div className='edit-f'>
            <h3>Edit {editData.itemName}</h3>
            {editData.data.map((field: any, index: number) => (
                <div key={index}>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={field.name}
                        onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                    />
                    <label>Value:</label>
                    <input
                        type="number"
                        value={field.value}
                        onChange={(e) => handleInputChange(index, 'value', Number(e.target.value))}
                    />
                    <label>Date:</label>
                    <input
                        type="date"
                        value={field.date}
                        onChange={(e) => handleInputChange(index, 'date', e.target.value)}
                    />
                </div>
            ))}
            
            {/* Add current_stock input */}
            <div>
                <label>Current Stock:</label>
                <input
                    type="number"
                    value={currentStock}
                    onChange={(e) => setCurrentStock(Number(e.target.value))}
                />
            </div>

            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default EditData;
