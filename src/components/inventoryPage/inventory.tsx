import React, { useState, useEffect } from 'react';
import SingleInventory from './singleInv';
import './inventory.css'
import axios from "axios";
import { User,  ItemData } from './types';

const ExamplePage: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentStage, setCurrentStage] = useState('');

  const [itemName, setItemName] = useState('');
  const [discription, setDiscription] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [currentStock, setCurrentStock] = useState('');



  const [inventoryData, setInventoryData] = useState<ItemData[]>([]);
  const [user] = useState<User | null>(
    (JSON.parse(localStorage.getItem("user") as string) || {}).user as User | null
  );
  
  useEffect(() => {
    let url = import.meta.env.VITE_Base_Url || "http://localhost:3000"
    url = url + "/bo/apis/inventory/"

    const fetchData = async () => {
      try {
        const response: any = await axios.get(url, {
          headers: { Authorization: `Bearer ${user?.token}` }
        });
        setInventoryData(response.data.data);
      } catch (err) {
        console.log("error fetching item", err);
      }
    }
    fetchData();
    console.log(inventoryData, "inventory--data")

  },[!inventoryData]);
  const handleAddItem = () => {
    setIsFormOpen(true);
  };



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newData: ItemData = {
      currentStage: Number(currentStage),
      item_name: itemName,
      discription: discription,
      image_link: imageLink,
      data:[],
      current_stock: Number(currentStock)
    };
    console.log(inventoryData, "inventory--")
    // Add the new data to the inventoryData array
    setInventoryData([...inventoryData, newData]);
    try {
      let url = import.meta.env.VITE_Base_Url || "http://localhost:3000"
      url = url + "/bo/apis/inventory/"
      const response = await axios.post(url,
        { newData }
      );
      console.log(response)
    } catch {
      console.log("error posting item")
    }

    setIsFormOpen(false);
    setCurrentStage('');
    setItemName('');
    setImageLink('');
    setDiscription('');
    setCurrentStock('');

  };

  const handleClose = () => {
    setIsFormOpen(false);
  };
  console.log(inventoryData)
  return (
    <div className='Inventory'>
      <div>
        <h1>Inventory</h1>
        <button onClick={handleAddItem}>Add Item</button>
        {isFormOpen && (
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <label htmlFor="currentStage">Current Stage:</label>
              <input
                type="number"
                id="currentStage"
                value={currentStage}
                onChange={(e) => setCurrentStage(e.target.value)}
              />

              <label htmlFor="itemName">Item Name:</label>
              <input
                type="text"
                id="itemName"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <label htmlFor="discription">Discription:</label>
              <input
                type="text"
                id="discription"
                value={discription}
                onChange={(e) => setDiscription(e.target.value)}
              />
              <label htmlFor="imageLink">Image Link:</label>
              <input
                type="text"
                id="imageLink"
                value={imageLink}
                onChange={(e) => setImageLink(e.target.value)}
              />
              <label htmlFor="currentStock">Current Stock</label>
              <input
                type="text"
                id="currentStock"
                value={currentStock}
                onChange={(e) => setCurrentStock(e.target.value)}
              />
              

              
              <button type="submit">Submit</button>
              <button type="button" onClick={handleClose}>Close</button>
            </form>
          </div>
        )}
        
      </div>
      {inventoryData.length && inventoryData.map((data) => (
        <SingleInventory key={data.item_name} data={data} />
      ))}
    </div>
  );
};

export default ExamplePage;
