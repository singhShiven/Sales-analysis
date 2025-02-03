import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Table, Spinner, Alert } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import { fetchProductSales } from "../services/api";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend  
} from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const SalesByProduct = () => {
  const [salesData, setSalesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProductSales = async () => {
      try {
        const data = await fetchProductSales();
        //console.log("Raw API Response:", data);

        if (!data || typeof data !== 'object') {
          throw new Error("Invalid data format received");
        }

        // Convert object response into an array format [{ product: "Classic Cars", sales: 50000 }, ...]
        const transformedData = Object.entries(data).map(([product, sales]) => ({
          product,
          sales
        }));

        // Generate random colors for each product
        const colors = transformedData.map(() => 
          `rgba(${Math.floor(Math.random() * 255)}, 
                ${Math.floor(Math.random() * 255)}, 
                ${Math.floor(Math.random() * 255)}, 0.6)`
        );

        const chartData = {
          labels: transformedData.map(item => item.product),
          datasets: [{
            data: transformedData.map(item => item.sales),
            backgroundColor: colors,
            borderColor: colors.map(color => color.replace('0.6', '1')),
            borderWidth: 1
          }]
        };

        setSalesData({
          chartData,
          tableData: transformedData
        });
        setError(null);
      } catch (err) {
        setError('Failed to load product sales data');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProductSales();
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
        position: 'right',
      },
      title: {
        display: true,
        text: 'Sales Distribution by Product'
      }
    }
  };

  return (
    <div className="p-4">
      <Row>
        <Col md={7}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Product Sales Distribution</Card.Title>
              <div style={{ height: '400px' }}>
                {salesData && <Pie data={salesData.chartData} options={options} />}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={5}>
          <Card>
            <Card.Body>
              <Card.Title>Product Sales Details</Card.Title>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Product Line</th>
                    <th>Sales ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData && salesData.tableData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.product}</td>
                      <td>${item.sales.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SalesByProduct;
