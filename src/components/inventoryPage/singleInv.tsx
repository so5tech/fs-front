import React, {useState} from 'react'
import './inventory.css'
import BarChart from './dateGraph';
import Item from './item';
import { PipelineWithHoverProps } from './types';




const SingleInventory: React.FC<PipelineWithHoverProps> = ({ data }) => {
    const [hovered, setHovered] = useState(false);
    alert(hovered);

    const stageColors = [
        { threshold: 3, color: 'red' },
        { threshold: 6, color: 'yellow' },
        { threshold: 10, color: 'green' },
    ];

    const stageColor = stageColors.find(config => data.currentStage <= config.threshold)?.color || 'lightgray';

    return (
        <div className="pipeline-with-hover sigleinv">
            <Item onHover={setHovered} data={data} />
            {/* {hovered && <BarChart data={data} stageColor={stageColor} />} */}
            <BarChart data={data.data} stageColor={stageColor} />
        </div>
    );
};



export default SingleInventory;