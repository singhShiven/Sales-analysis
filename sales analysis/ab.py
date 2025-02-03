# Import necessary libraries
import pandas as pd
import matplotlib.pyplot as plt
from statsmodels.tsa.arima.model import ARIMA
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
from sklearn.metrics import mean_squared_error
import numpy as np

# Step 1: Load and inspect data
# Read the dataset (use appropriate encoding to handle special characters)
df = pd.read_csv('sales_data_sample.csv', encoding='ISO-8859-1')  # Adjust path if necessary

# Display the first few rows of the dataset to understand its structure
print(df.head())

# Display information about the DataFrame including data types and non-null entries
print(df.info())

# Generate summary statistics to get basic descriptive stats like mean, std, min, and max
print(df.describe())

# Check for missing values in each column
print(df.isnull().sum())

# Step 2: Handle missing values
# Select only numeric columns for imputation
numeric_columns = df.select_dtypes(include=['number']).columns

# Fill missing numeric values with the mean of the respective columns
df[numeric_columns] = df[numeric_columns].fillna(df[numeric_columns].mean())

# Handle missing categorical columns by filling with default values
df['STATE'] = df['STATE'].fillna('Unknown')  # Fill missing 'STATE' with 'Unknown'
df['TERRITORY'] = df['TERRITORY'].fillna(df['TERRITORY'].mode()[0])  # Fill missing 'TERRITORY' with the most frequent value
df['POSTALCODE'] = df['POSTALCODE'].fillna('Unknown')  # Fill missing 'POSTALCODE' with 'Unknown'

# Step 3: Convert 'ORDERDATE' column to datetime format for time-based analysis
df['ORDERDATE'] = pd.to_datetime(df['ORDERDATE'], errors='coerce')  # Converts errors to NaT

# Step 4: Aggregation by 'COUNTRY' and 'PRODUCTLINE'
# Calculate total sales by country
country_sales = df.groupby('COUNTRY')['SALES'].sum().sort_values(ascending=False)
print(country_sales)

# Calculate total sales by product line
product_sales = df.groupby('PRODUCTLINE')['SALES'].sum().sort_values(ascending=False)
print(product_sales)

# Step 5: Visualize the sales data
# Plot total sales by country using a bar chart
country_sales.plot(kind='bar', figsize=(10, 6))
plt.title('Total Sales by Country')
plt.xlabel('Country')
plt.ylabel('Total Sales')
plt.xticks(rotation=90)  # Rotate country names for readability
plt.show()

# Plot the sales distribution by product line as a pie chart
product_sales.plot(kind='pie', figsize=(8, 8), autopct='%1.1f%%')
plt.title('Sales Distribution by Product Line')
plt.ylabel('')
plt.show()

# Step 6: Monthly sales aggregation
# Group data by 'YEAR_ID' and 'MONTH_ID' to calculate total sales per month
monthly_sales = df.groupby(['YEAR_ID', 'MONTH_ID'])['SALES'].sum()

# Reset the index to make YEAR_ID and MONTH_ID regular columns
monthly_sales = monthly_sales.reset_index()

# Create a 'DATE' column by combining YEAR_ID, MONTH_ID, and a default day ('01')
monthly_sales['DATE'] = pd.to_datetime(monthly_sales['YEAR_ID'].astype(str) + '-' + monthly_sales['MONTH_ID'].astype(str) + '-01')

# Plot the historical sales over time
plt.plot(monthly_sales['DATE'], monthly_sales['SALES'], label='Historical Sales')
plt.title('Monthly Sales')
plt.xlabel('Date')
plt.ylabel('Sales')
plt.xticks(rotation=45)  # Rotate the x-axis labels for readability
plt.legend()
plt.show()

# Step 7: Feature selection for Random Forest model
# Select relevant features for model training
features = df[['QUANTITYORDERED', 'PRICEEACH', 'MSRP', 'QTR_ID', 'MONTH_ID']]
target = df['SALES']

# Split the data into training and testing sets (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(features, target, test_size=0.2, random_state=42)

# Initialize and train a Random Forest Regressor model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Step 8: Make predictions and evaluate the model
# Predict sales for the test set
y_pred = model.predict(X_test)

# Calculate and print Mean Absolute Error (MAE)
mae = mean_absolute_error(y_test, y_pred)
print(f'Mean Absolute Error: {mae}')

# Calculate and print Root Mean Squared Error (RMSE)
mse = mean_squared_error(y_test, y_pred)  # Mean Squared Error
rmse = np.sqrt(mse)  # Root Mean Squared Error (RMSE)
print(f"Root Mean Squared Error (RMSE): {rmse}")
