# AmeriCommerce to Shopify Converter

A command-line tool to convert AmeriCommerce exports (customers, orders, and products) to Shopify import format.

## Features

- Convert AmeriCommerce customer exports to Shopify customer import format
- Convert AmeriCommerce order exports to Shopify order import format
- Convert AmeriCommerce product exports to Shopify product import format
- Simple command-line interface with clear options

## Installation

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Build the application:
   ```
   npm run build
   ```

## Usage

### Converting Customers

```bash
npm start -- customers -i path/to/americommerce-customers.csv -o path/to/shopify-customers.csv
```

### Converting Orders

```bash
npm start -- orders -i path/to/americommerce-orders.csv -o path/to/shopify-orders.csv
```

### Converting Products

```bash
npm start -- products -i path/to/americommerce-products.csv -o path/to/shopify-products.csv
```

### Command Options

Each command supports the following options:

- `-i, --input <path>`: Path to the AmeriCommerce export CSV file (required)
- `-o, --output <path>`: Path to save the Shopify import CSV file (optional, defaults to a file in the current directory)

## Development

To run the application in development mode:

```bash
npm run dev -- [command] [options]
```

## File Format Requirements

### AmeriCommerce Customer Export

The CSV file should contain columns such as:
- email
- first_name
- last_name
- company
- phone
- address1
- address2
- city
- state
- zip
- country

### AmeriCommerce Order Export

The CSV file should contain columns such as:
- order_number
- customer_email
- customer_first_name
- customer_last_name
- order_date
- order_status
- payment_method
- shipping_method
- subtotal
- tax_total
- shipping_total
- discount_total
- grand_total

### AmeriCommerce Product Export

The CSV file should contain columns such as:
- item_number
- item_name
- description
- price
- cost
- weight
- inventory_level
- category_name
- manufacturer_name
- status

## License

ISC
