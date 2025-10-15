# CreditSea Frontend

This is the React frontend for the CreditSea Fullstack Engineer Assignment. The frontend consumes the backend API to upload XML files, retrieve processed credit reports, and display them in a user-friendly interface.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)  
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Notes](#notes)


---

## Features
- Upload Experian XML files for credit report extraction.
- View a list of all uploaded reports with basic details and credit scores.
- Navigate to a detailed view of each report, showing:
- Basic Details (Name, Mobile Phone, PAN, Credit Score)
- Report Summary (Accounts, balances, last 7 days enquiries)
- Credit Accounts Information (Bank, Account Number, Address, Current Balance, Amount Overdue)
- Responsive design suitable for desktop and mobile devices.

---

## Tech Stack

- **React**: Frontend library for building UI.
- **React Router**: Navigation between pages.
- **Axios**: API requests to backend endpoints.
- **Tailwind CSS**: Styling and responsive design.
- **TypeScript**: Type safety and better code quality.

---

## Project Structure

```bash
frontend/
├── src/
│ ├── api/ 
│ ├── components/
│ ├── lib/ 
│ ├── pages/
│ ├── App.tsx 
│ ├── index.css
│ └── main.tsx
├── .env.example
├── .gitignore
├── README.md
├── components.json
├── eslint.config.js
├── index.html
├── package-lock.json 
├── package.json 
├── tsconfig.app.json 
├── tsconfig.json
├── tsconfig.node.json 
└── vite.config.ts
```

---

## Setup & Installation

#### 1. Install dependencies:
```bash
cd frontend

npm install
# or 
yarn install
```

#### 2. Set up environment variables:

Create a `.env` file in the frontend root directory:
```bash
VITE_API_URL=http://localhost:5000/api
```
This points to your backend API.

---

## Running the Application
Start the development server:
```bash
npm run dev
# or
yarn dev
```

The frontend should now be running at:
```bash
    http://localhost:5173
```


Ensure your backend server is running simultaneously to allow API communication.

--- 

## Usage

**1. Home Page**: Quick links to upload XML files or view reports.

**2. Uploads Page**:

- Select an XML file and upload it to the backend.
- Frontend validates file type before sending.

**3. Reports Page**:

- Displays all uploaded reports in a table.
- Click View to navigate to a detailed view.

**4. Report Details Page**:

- Shows Basic Details, Report Summary, and Credit Accounts in separate sections.

---

## Notes

- The Report Details page does not show the global Header to focus on the report content.
- Tables are responsive and scroll horizontally on smaller screens.
- API errors and loading states are handled gracefully.
