## CreditSea Backend

This is the Node.js & Express backend for the CreditSea Fullstack Engineer Assignment. It provides RESTful API endpoints for XML upload, data extraction, storage in MongoDB, and retrieval for the frontend application.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Running the Backend](#running-the-backend)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Notes](#notes)

# Features
- Upload Experian XML files for processing.
- Parse XML files to extract:
    - **Basic Details**: Name, Mobile Phone, PAN, Credit Score.
    - **Report Summary**: Total accounts, active accounts, closed accounts, current balance, secured/unsecured amounts, last 7 days credit enquiries.
    - **Credit Accounts**: Credit card info, banks, addresses, account numbers, amount overdue, current balance.
- Persist extracted data in MongoDB.
- Provide API endpoints to fetch all reports or a single report - by ID.
- Robust error handling and validation for XML uploads.

---

## Tech Stack
- **Node.js**: Runtime environment
- **Express**: RESTful API framework
- **MongoDB**: NoSQL database for storing extracted report data
- **Mongoose**: MongoDB object modeling for Node.js
- **Multer**: File upload handling
- **xml2js**: XML parsing library
- **Dotenv**: Environment variable management

---

## Project Structure
```bash
backend/
├─ src/
│  ├─ config/
│  ├─ middleware/
│  ├─ models/
│  ├─ routes/
│  ├─ utils/ 
│  ├─ app.ts                
│  └─ server.ts  
├─ .env.example
├─ .gitignore
├─ README.md
├─ package-lock.json
├─ package.json
└─ tsconfig.json
```

---

## Setup & Installation

#### 1. Install dependencies:
```bash
cd backend

npm install
# or
yarn install
```

---

## Environment Variables

Create a `.env` file in the backend root with the following:
```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/creditsea
```

- `PORT` — Port where backend runs.
- `MONGO_URI` — MongoDB connection string.

---

## Running the Backend

Start the server in development mode:
```bash
npm run dev
# or
yarn dev
```

Start the production server:
```bash
npm start
# or
yarn start
```

Server will run at:
```bash
http://localhost:5000
```

---

## API Endpoints
| Method | Endpoint | Description | Request Body / Params |
|--------|----------|-------------|----------------------|
| POST | `/api/upload` | Upload an Experian XML file | `multipart/form-data` with file field (XML only) |
| GET | `/api/reports` | Get all stored reports | None |
| GET | `/api/reports/:id` | Get a single report by MongoDB ID | `id` (MongoDB ObjectId) |


#### Example: Upload XML
```bash
POST /api/upload
Content-Type: multipart/form-data
file=<your-file.xml>
```

### Example: Fetch Reports
```bash
GET /api/reports
```

### Example: Fetch Reports By Id
```bash
GET /api/reports/:id
```

---

## Database Schema
### CreditReport (Mongoose)
```bash
{
  basicDetails: {
    name: String,
    mobilePhone: String,
    pan: String,
    creditScore: Number
  },
  reportSummary: {
    totalAccounts: Number,
    activeAccounts: Number,
    closedAccounts: Number,
    currentBalance: Number,
    securedAmount: Number,
    unsecuredAmount: Number,
    last7DaysEnquiries: Number
  },
  creditAccounts: [
    {
      accountType: String,
      bank: String,
      address: String,
      accountNumber: String,
      amountOverdue: Number,
      currentBalance: Number
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

---

## Error Handling
- Invalid file type → 400 Bad Request
- File not provided → 400 Bad Request
- XML parsing errors → 500 Internal Server Error
- MongoDB errors → 500 Internal Server Error

---

## Testing

- Unit tests can be written for:
    - XML parsing service
    - API endpoints using tools like Jest + Supertest
- Run tests:
```bash
npm test
# or
yarn test
```

---

## Notes
- Ensure MongoDB is running locally or adjust MONGO_URI for remote connections.
- All uploaded files are processed and removed after parsing to avoid clutter.
- The backend works seamlessly with the React frontend for a complete fullstack application.
