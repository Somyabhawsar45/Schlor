# Scholr - Full Stack EdTech Platform

Scholr is a full-stack EdTech platform built with the MERN stack, enabling students to enroll in courses and instructors to create and manage them.

## 🚀 Live Demo
[https://scholr.vercel.app](https://scholr.vercel.app)

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- Redux Toolkit

**Backend:**
- Node.js
- Express.js
- MongoDB Atlas

**Integrations:**
- Razorpay (Payment Gateway)
- Cloudinary (Media Storage)
- Nodemailer (Email Service)
- JWT Authentication

## ⚙️ Setup & Installation

1. Clone the repository
```sh
    git clone https://github.com/Somyabhawsar45/Schlor.git
```

2. Install dependencies
```sh
    cd Schlor
    npm install
    cd server
    npm install
```

3. Set up environment variables
    - Create `.env` in `server/` folder
    - Add MongoDB, Razorpay, Cloudinary, and Mail credentials

4. Start the development server
```sh
    npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🌟 Features

- JWT Authentication with OTP verification
- Student course enrollment with Razorpay payments
- Instructor dashboard to create and manage courses
- Cloudinary media upload for course thumbnails and videos
- Email notifications for OTP, enrollment, and payment
- Responsive design for mobile and desktop

## 📁 Project Structure
Schlor/

├── src/          # React frontend

├── server/       # Node.js backend

│   ├── controllers/

│   ├── models/

│   ├── routes/

│   └── utils/

└── README.md


## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or pull request.