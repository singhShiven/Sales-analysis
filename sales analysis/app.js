// import express from 'express';
// import cors from 'cors';

// const app = express();

// // Enable CORS for specific origin (frontend URL)
// app.use(cors({
//   origin: 'http://localhost:5173',  // Allow requests from this frontend URL
//   methods: 'GET,POST,PUT,DELETE',  // Allowed HTTP methods
//   credentials: true,               // If your app needs cookies
// }));

// // Middleware to parse JSON
// app.use(express.json());

// // Test endpoint to verify connection
// app.get('/api/test', (req, res) => {
//   res.json({ message: 'Hello from the server!' });
// });

// // Example of another endpoint
// app.get('/api/dashboard', (req, res) => {
//   res.json({
//     salesData: [
//       { product: 'Product A', sales: 120 },
//       { product: 'Product B', sales: 150 },
//     ]
//   });
// });

// // Example of another endpoint
// app.get('/api/product-sales', (req, res) => {
//   res.json({ message: "Product Sales API working!" });
// });

// // Set the port for the server
// app.listen(5001, () => {
//   console.log('Server running on http://localhost:5001');
// });
