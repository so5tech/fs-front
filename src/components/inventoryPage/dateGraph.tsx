import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './inventory.css';
import { BarChartProps } from './types';

// Register necessary components for chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);



const BarChart: React.FC<BarChartProps> = ({ data, stageColor }) => {
    const chartData = {
        labels: data.map(d => d.date),
        datasets: [
            {
                label: 'Value',
                data: data.map(d => d.value),
                backgroundColor: stageColor,
            },
        ],
    };
    return (
        <div className="bar-chart">
            <Bar data={chartData} />
        </div>
    );
};

export default BarChart;
