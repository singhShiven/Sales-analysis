import React, { useEffect, useState } from 'react';
import { Card, Spinner, Alert } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { fetchMonthlySales } from "../services/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MonthlySales = () => {
  const [salesData, setSalesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMonthlySales = async () => {
      try {
        const data = await fetchMonthlySales();
        //console.log("Raw API Response:", data);

        if (!data || typeof data !== 'object') {
          throw new Error("Invalid data format received");
        }

        // Convert object response into an array format [{ date: "2025-01", sales: 1000 }, ...]
        const transformedData = Object.entries(data).map(([date, sales]) => ({
          date,
          sales
        }));

        const chartData = {
          labels: transformedData.map(item => item.date),
          datasets: [{
            label: 'Monthly Sales',
            data: transformedData.map(item => item.sales),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            backgroundColor: 'rgba(75, 192, 192, 0.5)'
          }]
        };

        setSalesData(chartData);
        setError(null);
      } catch (err) {
        setError('Failed to load monthly sales data');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMonthlySales();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="m-4">
        {error}
      </Alert>
    );
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Sales Trend'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Sales ($)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Month'
        }
      }
    }
  };

  return (
    <div className="p-4">
      <Card>
        <Card.Body>
          <Card.Title className="mb-4">Monthly Sales Analysis</Card.Title>
          <div style={{ height: '400px' }}>
            {salesData && <Line data={salesData} options={options} />}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MonthlySales;
