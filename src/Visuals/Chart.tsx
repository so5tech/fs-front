import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement, LineController, BarController } from 'chart.js';



ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineController,
  BarController
);

interface ChartProps {
  data: { date: string; value: number }[];
}

const Charts: React.FC<ChartProps> = ({ data }) => {
  const dates = data.map(item => item.date);
  const values = data.map(item => item.value);

  const barData = {
    labels: dates,
    datasets: [
      {
        label: 'Values',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: values,
      },
    ],
  };

  const lineData: any = {
    labels: dates,
    datasets: [
      {
        label: 'Values',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: values,
      },
    ],
  };

  return (
    <div>
      <h2>Bar Chart</h2>
      <Bar data={barData} />

      <h2>Line Graph</h2>
      <Line data={lineData} />
    </div>
  );
};

export default Charts;
