from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)

# Enable CORS for all routes with a specific configuration
CORS(app, supports_credentials=True, origins=['http://localhost:5173'])

# Load data
df = None
try:
    df = pd.read_csv('sales_data_sample.csv', encoding='ISO-8859-1')
except Exception as e:
    print(f"Error loading data: {e}")

@app.route('/api/test', methods=['GET'])
def test():
    return jsonify({"message": "API is working"})

@app.route('/api/dashboard', methods=['GET'])
def get_dashboard_data():
    if df is None:
        return jsonify({"error": "Data not loaded"}), 500
    
    total_sales = float(df['SALES'].sum())
    total_orders = len(df)
    avg_order_value = total_sales / total_orders if total_orders > 0 else 0
    
    return jsonify({
        "totalSales": total_sales,
        "totalOrders": total_orders,
        "averageOrderValue": float(avg_order_value)
    })

# Route to fetch sales by country
@app.route('/api/country-sales', methods=['GET'])
def get_country_sales_data():
    print("Fetching country sales data...") 
    if df is None:
        return jsonify({"error": "Data not loaded"}), 500
    
    country_sales = df.groupby('COUNTRY')['SALES'].sum().to_dict()
    return jsonify(country_sales)

# Route to fetch sales by product
@app.route('/api/product-sales', methods=['GET'])
def get_product_sales_data():
    print("Fetching product sales data...")
    if df is None:
        return jsonify({"error": "Data not loaded"}), 500
    
    product_sales = df.groupby('PRODUCTLINE')['SALES'].sum().to_dict()
    return jsonify(product_sales)

@app.route('/api/monthly-sales', methods=['GET'])
def get_monthly_sales_data():
    print("Fetching monthly sales data...")
    if df is None:
        return jsonify({"error": "Data not loaded"}), 500
    
    # Group by both YEAR_ID and MONTH_ID, then sum the sales
    monthly_sales = df.groupby(['YEAR_ID', 'MONTH_ID'])['SALES'].sum().reset_index()

    # Convert the grouped data to a dictionary (use tuple for YEAR_ID, MONTH_ID as the key)
    monthly_sales_dict = {
        f"{row['YEAR_ID']}-{row['MONTH_ID']}": row['SALES']
        for _, row in monthly_sales.iterrows()
    }

    return jsonify(monthly_sales_dict)
if __name__ == '__main__':
    app.run(debug=True, port=5001)
