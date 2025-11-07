# TaskFlow

TaskFlow is a simple task management application with a **frontend** built in React and a **backend** built with Node.js and MySQL. It supports user authentication, task management, and basic admin analytics.


---

## Folder Structure

```
TaskFlow/
├── backend/          # Node.js API
│   ├── controllers/  # API logic
│   ├── routes/       # Express routes
│   ├── config/       # Database config
│   ├── models/       # DB models (if any)
│   ├── .env          # Environment variables (not tracked)
│   └── package.json
├── frontend/         # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── README.md
└── .gitignore
```

---

## Postman Collection

The Postman collection for TaskFlow API is included in this repository.
You can download or import it into Postman using the link below:

[Download TaskFlow Postman Collection](./TaskFlow Full API Collection.postman_collection.json)
(Click to download or import directly into Postman)

### Usage

1. Open Postman → Click **Import** → Select **File**.
2. Choose `taskflow_collection.json` from your local copy of the repository.
3. Use the collection to test TaskFlow API endpoints.

#### Test Credentials (if applicable):

* **Admin:** [admin@taskflow.com](mailto:admin@taskflow.com) / [password]
* **User:** [user1@taskflow.com](mailto:user1@taskflow.com) / [password]

---

## Setup Instructions

### 1. Backend

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file (example):

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=taskflow_db
JWT_SECRET=your_jwt_secret
```

4. Run the backend:

```bash
npm run dev
```

API will run on `http://localhost:5000` (or your configured port).

---

### 2. Frontend

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables if needed in `.env` (like API base URL):

```
REACT_APP_API_URL=http://localhost:5000/api/v1
```

4. Run the frontend:

```bash
npm start
```

Frontend will run on `http://localhost:3000`.

---

## Features

* User registration and login (JWT-based authentication)
* CRUD operations for tasks
* Admin dashboard for user management and analytics
* Responsive React frontend

---

## API Documentation

You can test all APIs using the [Postman collection](./taskflow_collection.json).

### Example Endpoints:

* `POST /api/v1/auth/register`
* `POST /api/v1/auth/login`
* `GET /api/v1/admin/users`
* `DELETE /api/v1/admin/users/:id`

---

## Scalability Notes

* **Microservices:** Could separate authentication, task, and admin services.
* **Caching:** Use Redis to cache frequent queries (e.g., dashboard stats).
* **Load balancing:** Deploy behind Nginx or a cloud load balancer.
* **Database optimization:** Index frequently queried fields, use connection pooling.

---

## Contributing

Feel free to open issues or submit pull requests to improve TaskFlow.

---

## License

This project is open-source and free to use.
