import React, {useState} from 'react';
import './inventory.css';
import EditData from './editItem';
import { PipelineProps } from './types';



const stageColors = [
    { threshold: 3, color: 'red' },
    { threshold: 6, color: 'yellow', textColor: 'black' },
    { threshold: 10, color: 'green' },
];

const Item: React.FC<PipelineProps> = ({ onHover, data  }) => {
    const totalStages = 10;
    const [isEditing, setIsEditing] = useState(false);
    // Determine the color to apply based on the current stage
    const getStageStyle = () => {
        const stageConfig = stageColors.find(config => data.currentStage <= config.threshold);
        return stageConfig ? { backgroundColor: stageConfig.color, color: stageConfig.textColor || 'white' } : {};
    };

    const handleSave = (updatedData: any) => {
        // Logic to update the data array in the parent component
        console.log('Updated Data:', updatedData);
        setIsEditing(false);
    };

    const stageStyle = getStageStyle();
    return (
        <div className="pipeline"
        onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
        >
            <div>
            <p>{data.item_name}</p>
            <p>{data.current_stock}</p>
            {/* <button>Update {data.itemName}</button> */}
            <button className='update-bt' onClick={() => setIsEditing(true)}>Update {data.item_name}</button> 
            
            {isEditing && <EditData data={data} onSave={handleSave} />}
            </div>
            {[...Array(totalStages)].map((_, index) => (
                <React.Fragment key={index}>
                    <div
                        className="stage"
                        style={index < data.currentStage ? stageStyle : {}}
                    >
                        {index + 1}
                    </div>
                    {index < totalStages - 1 && (
                        <div
                            className="pipe"
                            style={index < data.currentStage - 1 ? stageStyle : {}}
                        />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};



export default Item;
