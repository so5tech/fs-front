import React, { useState } from 'react';
import './taskhome.css';
import TaskDetails from './task';
import { Item } from './type'; // Adjust the import path as needed

const TaskHome: React.FC = () => {
    const [items, setItems] = useState<Item[]>([
        {
            id: 1,
            title: "Complete the report",
            description: "Finish the quarterly financial report.",
            Quantity: 10,
            Min_Exp_Date: "2024-08-10",
            Max_Exp_Date: "2024-08-15",
            group: "In_Stock",
            status: "In_Stock"
        },
        {
            id: 2,
            title: "Order new supplies",
            description: "Order new office supplies before they run out.",
            Quantity: 5,
            Min_Exp_Date: "2024-08-05",
            Max_Exp_Date: "2024-08-10",
            group: "About_to_End",
            status: "About_to_End"
        },
        {
            id: 3,
            title: "Restock inventory",
            description: "Restock items that are out of stock.",
            Quantity: 0,
            Min_Exp_Date: "2024-08-12",
            Max_Exp_Date: "2024-08-17",
            group: "Out_of_Stock",
            status: "Out_of_Stock"
        }
    ]);

    const handleStatusChange = (id: number, newStatus: string) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, status: newStatus } : item
        ));
    };

    const inStockItems = items.filter(item => item.status === "In_Stock");
    const aboutToEndItems = items.filter(item => item.status === "About_to_End");
    const outOfStockItems = items.filter(item => item.status === "Out_of_Stock");

    return (
        <div className="task-home">
            Task Management Home
            <div className="Nav-tm">
                <div className="tm">
                    <h3>In Stock</h3>
                    {inStockItems.map(item => (
                        <TaskDetails
                            key={item.id}
                            item={item}
                            onStatusChange={handleStatusChange}
                        />
                    ))}
                </div>
                <div className="tm">
                    <h3>About to End</h3>
                    {aboutToEndItems.map(item => (
                        <TaskDetails
                            key={item.id}
                            item={item}
                            onStatusChange={handleStatusChange}
                        />
                    ))}
                </div>
                <div className="tm">
                    <h3>Out of Stock</h3>
                    {outOfStockItems.map(item => (
                        <TaskDetails
                            key={item.id}
                            item={item}
                            onStatusChange={handleStatusChange}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TaskHome;
