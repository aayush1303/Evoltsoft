# EV Charging Station Management App

A full-stack web application to manage electric vehicle charging stations. Users can register, log in, add, edit, filter, and delete charging station data, all backed by secure authentication and a live map view.

---

##  Features

- User Registration & Login (JWT authentication)
- CRUD operations for charging stations
- Filter stations by status, power output, connector type
- Responsive frontend with Tailwind CSS
- Vue 3 + Vite for lightning-fast UI
- Node.js + Express + MongoDB backend
- Protected API routes

---

## Tech Stack

### Frontend:
- Vue 3 + Vite
- Tailwind CSS
- Vue Router
- Axios
- oh-vue-icons (for icons)

### Backend:
- Node.js + Express
- MongoDB + Mongoose
- bcryptjs (password hashing)
- jsonwebtoken (JWT)
- dotenv
- cors

---

## Getting Started

### 1. Clone the Repository

Make sure you have Git installed. If not, install Git:

**Windows/macOS/Linux**: [Download Git](https://git-scm.com/downloads)

Then clone the repository:

```sh
git clone https://github.com/aayush1303/Evoltsoft
```
### 2. Setting up the Backend
Navigate to the backend directory and install dependencies
```sh
cd backend
npm install
```
#### 2.1 Create a .env file with your configuration
Replace your_jwt_secret_key with a strong secret key and your_mongodb_connection_uri with your MongoDB URI.
```sh
echo "JWT_SECRET=your_jwt_secret_key" > .env
echo "MONGODB_URI=your_mongodb_connection_uri" >> .env
```
#### 2.2 Start the backend server
The backend will run on: http://localhost:4000
```sh
npx nodemon server.js
```

### 3. Setting up the Frontend
Open a new terminal and navigate to the frontend directory
```sh
cd frontend
npm install
```
#### 3.1 Create the frontend environment file
Create a .env file inside the frontend folder with this content
```sh
echo "VITE_BACKEND_API_URL=http://localhost:4000" > .env
```
#### 3.2 Start the development server
```sh
npm run dev
```
### 4 Configure CORS (Important)
Before using the APIs, ensure your `server.js` has proper CORS configuration. Open `backend/server.js` and add:

```javascript
import cors from 'cors';

// Configure CORS to allow requests from your frontend
app.use(cors({
  origin: ['http://localhost:5173'] // Default Vite frontend URL
  // If your frontend runs on a different port, update this accordingly
}));
```