# Invento

**Invento** is a web-based inventory management system designed for small to medium-sized retail businesses.  
It provides essential features for managing products, monitoring stock, and handling purchase and sales transactions.

## Tech Stack

**Client:** React.js, Vite, TailwindCSS, Axios, React Query,

**Server:** Laravel

**Database:** Postgresql

**Deployment:** Railway

## Core Features

### Authentication

- JWT-based login system
- Protect backend routes using `auth:api` middleware

### Master Data

- Manage product categories
- Manage products (name, SKU, unit, pricing, stock)

### Stock Monitoring

- View stock in/out logs
- Track real-time current stock per product

### Purchase Order (PO)

- Create and manage purchase orders from suppliers
- Automatically update product stock and purchase price

### Sales Order (SO)

- Create and manage sales orders to customers
- Automatically reduce stock on successful sales
