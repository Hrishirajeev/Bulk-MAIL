# MERN Stack Bulk Mail Application

A simple bulk email application that allows users to upload an Excel file containing email addresses and send emails to multiple recipients at once.

## Features

- Upload Excel files (`.xlsx`, `.xls`)
- Extract email addresses from the Excel file
- Enter a custom email message
- Send emails to multiple recipients
- Display the recipient count

## Tech Stack

**Frontend**
- React.js
- Tailwind CSS
- Axios
- XLSX

**Backend**
- Node.js
- Express.js
- Nodemailer

**Database**
- MongoDB

## Project Structure

```text
Simple-BulkMail-FBDB/
├── Backend/
│   ├── index.js
│   └── package.json
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── package.json
└── README.md
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Hrishirajeev/Bulk-MAIL.git
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd Backend
npm install
```

## Run the Application

Start the backend:

```bash
cd Backend
node index.js
```

Start the frontend in a separate terminal:

```bash
npm run dev
```

## Usage

1. Open the application in your browser.
2. Upload an Excel file containing email addresses in the first column.
3. Enter your email message.
4. Click the Send button to send emails to the recipients.

## Author

**Hrishi
