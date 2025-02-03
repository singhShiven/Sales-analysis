import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { fetchCountrySales } from '../services/api';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Register required components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const SalesByCountry = () => {
  const [salesData, setSalesData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    const loadCountrySales = async () => {
      try {
        const data = await fetchCountrySales();
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format from API');
        }
        setSalesData({
          labels: data.map(item => item.country),
          datasets: [
            {
              label: 'Sales by Country',
              data: data.map(item => item.sales),
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }
          ]
        });
      } catch (error) {
        console.error('Error loading country sales data:', error);
      }
    };

    loadCountrySales();
  }, []);

  return (
    <div className="p-4">
      <Card>
        <Card.Body>
          <Card.Title>Sales by Country</Card.Title>
          <div style={{ height: '400px' }}>
            <Bar 
              data={salesData}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SalesByCountry;
