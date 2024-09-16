import React from 'react';
import './taskhome.css';
import { Item } from './type'; // Adjust the import path as needed

type TaskDetailsProps = {
    item: Item;
    onStatusChange: (id: number, newStatus: string) => void;
};

const statuses = [
    "In_Stock",
    "About_to_End",
    "Out_of_Stock",
    // Add other statuses if needed
];

const TaskDetails: React.FC<TaskDetailsProps> = ({ item, onStatusChange }) => {
    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = event.target.value;
        onStatusChange(item.id, newStatus);
    };

    return (
        <div className="task-details">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p><strong>Quantity:</strong> {item.Quantity}</p>
            <p><strong>Min Exp Date:</strong> {item.Min_Exp_Date}</p>
            <p><strong>Max Exp Date:</strong> {item.Max_Exp_Date}</p>
            <p><strong>Group:</strong> {item.group}</p>
            <p><strong>Status:</strong>
                <select value={item.status} onChange={handleStatusChange}>
                    {statuses.map(statusOption => (
                        <option key={statusOption} value={statusOption}>
                            {statusOption.replace(/_/g, ' ')}
                        </option>
                    ))}
                </select>
            </p>
        </div>
    );
};

export default TaskDetails;
