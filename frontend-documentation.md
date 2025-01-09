# Frontend Documentation

## Project Overview

## System Overview

Matrium is a Material Requirements Planning (MRP) system designed to manage inventory, recipes, and deliveries with a comprehensive dashboard for monitoring and analytics.

## Core Features

### 1. Dashboard

- **Key Metrics Display:**
  - Categories count with year-over-year comparison
  - Total items with inventory changes
  - Total item cost tracking
  - Low stock items monitoring
- **Notifications System:**
  - Low stock warnings
  - New order alerts
  - Stock update notifications
- **Financial Analytics:**
  - Revenue vs Expenses visualization
  - Trend analysis with line charts

### 2. Stock and Inventory Management

- **Stock List Features:**
  - Comprehensive item (Raw Materials/Final Product) tracking with fields:
    - S/N (Serial Number)
    - Product image
    - Product Name
    - Product ID (Format: XX-XXX-000)
    - Category
    - Quantity Purchased
    - Unit Price
    - Total Amount
    - Supplier
    - Status (In stock, Low in stock, Out of Stock)
- **Stock Update System:**
  - Add New Raw Materials functionality
  - Image upload support (JPG, JPEG, PNG, max 2MB)
  - Category selection
  - Automatic total amount calculation
  - Supplier management

### 3. Recipe Management

- **Recipe Types:**
  - Fixed Recipes
  - Variable Recipes
- **Recipe Information:**
  - Recipe Name
  - Product Name
  - Category
  - Date of Creation
  - Ingredients list with quantities and costs
  - Total cost calculation
- **Recipe List Features:**
  - ID tracking
  - Recipe name
  - Product name
  - Type classification
  - Date tracking
  - Total price calculation
  - Action buttons for view, edit, and delete

### 4. Delivery Management

- **Delivery List Features:**
  - ID tracking
  - Customer Name
  - Delivery Address
  - Delivery Date
  - Delivery Type (Express/Standard)
  - Status tracking (Pending, Shipped, Delivered)
  - Action buttons for view and manage
- **Delivery Information:**
  - Customer Name
  - Delivery Address
  - Delivery Date
  - Delivery Type (Express/Standard)
  - Status tracking (Pending, Shipped, Delivered)
  - Final Product list with quantities and costs
  - Total cost calculation

## Getting Started

### Development Setup

#### Installation

```bash
# Clone the repository
git clone [https://github.com/Fadene-Akram/MATRIUM.git]

# Navigate to project directory
cd [MATRIUM]

# Install dependencies
npm install
```

#### Development

```bash
npm run dev
```

## Project Structure

```
src/
├── assets/
│   ├── fonts/
│   ├── icons/
│   └── images/
├── components/
│   ├── CreateEditRecipe/
│   ├── DashboardComponents/
│   ├── DeliveryList/
│   ├── RecipeList/
│   ├── ReusedComponent/
│   ├── StockAndInventory/
│   └── UtilizeRecipe/
├── context/
├── data/
├── hooks/
├── pages/
│   ├── CreateEditRecipe/
│   ├── Dashboard/
│   ├── Delivery/
│   ├── login/
│   ├── RecipeList/
│   ├── StockAndInventory/
│   ├── UpdateStock/
│   └── UtilizeRecipe/
└── utils/
```

## Architecture

## Tech Stack

- **Frontend Framework:** React 19
- **Build Tool:** Vite 6
- **Data Fetching:**
  - Tanstack React Query v5
  - Axios
- **State Management:** React Context API
- **Routing:** React Router DOM v7
- **Forms:** React Hook Form v7
- **Styling:** Styled Components v6
- **Visualization:**
  - Chart.js v4
  - React Chart.js 2 v5
- **PDF Generation:**
  - jsPDF
  - jsPDF-autotable
- **Icons:** React Icons v5

## State Management

- React Context API for global state
- React Query for server state management
- Form state handled by React Hook Form

## API Integration

- API endpoints for CRUD operations
- Data fetching with React Query and Axios
- Proper error handling and loading states

## Security

- Login system implementation
- Protected routes

## Best Practices

- Component reusability
- Form validation
- Error handling
- Loading states
- Consistent styling
- Clear user feedback
- Respecting design patterns like: DRY,Provider,Module
- Follow existing naming conventions
- Maintain component structure
- Follow established coding patterns
- Document new features
- Document all component using Jsdoc
