import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register required chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {

  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    fetch('/data.json') // Fetching the data.json file from public folder
      .then((response) => response.json())
      .then((jsonData) => setJsonData(jsonData)) // Set the fetched data to state
      .catch((error) => console.error('Error fetching JSON:', error));
  }, []);
  
  // Extract categories and values for the chart
  const categories = jsonData.map(item => item.category);
  const values = jsonData.map(item => item.value);

  // Data for the chart
  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Sample Data',
        data: values,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: 'Bar Chart Example' }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',  // Center horizontally
        alignItems: 'center',      // Center vertically
        height: '100vh',           // Full height of viewport
      }}
    >
      <div style={{ width: '800px', height: '600px' }}> {/* Set chart size */}
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
