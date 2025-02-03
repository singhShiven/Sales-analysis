# Sales Performance Dashboard

This project is a **Sales Performance Dashboard** built using **React (Frontend)** and **Flask (Backend)**. The dashboard provides sales insights, including total sales, order statistics, sales distribution by country and product, and visualizations using **Chart.js**.

## Features

- **Sales Dashboard**: Displays total sales, total orders, and average order value.
- **Sales by Country**: Shows a breakdown of sales by country using a bar chart.
- **Sales by Product**: Displays sales distribution by product line using a pie chart.
- **Interactive Charts**: Uses Chart.js for visualization.
- **Responsive Design**: Built using React Bootstrap for a user-friendly experience.

## Technologies Used

### Frontend:
- React.js
- React Bootstrap
- Chart.js
- Axios

### Backend:
- Flask
- Pandas
- Flask-CORS

## Setup Instructions

### Prerequisites
Ensure you have the following installed:
- Node.js & npm (for frontend)
- Python & pip (for backend)

### Backend Setup (Flask API)

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/sales-dashboard.git
   cd sales-dashboard
   ```
2. Create and activate a virtual environment:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Run the Flask server:
   ```sh
   python app.py
   ```
   The API will run on `http://localhost:5001`

### Frontend Setup (React)

1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

## API Endpoints

### Test API
- `GET /api/test` - Checks if the API is working

### Dashboard Data
- `GET /api/dashboard` - Retrieves total sales, total orders, and average order value

### Sales by Country
- `GET /api/country-sales` - Returns sales grouped by country

### Sales by Product
- `GET /api/product-sales` - Returns sales grouped by product line

## Troubleshooting

- If you get a **CORS issue**, ensure Flask-CORS is properly configured.
- If **Axios returns a 404 error**, check if the Flask server is running and the API endpoint is correct.
- If **data.map is not a function error occurs**, ensure the API response is correctly formatted as an array.

## License
This project is open-source and available under the [MIT License](LICENSE).
