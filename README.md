# QuickStock

QuickStock is a full-stack inventory management application designed to streamline the process of managing and tracking inventory. The application allows users to add, view, update, and delete inventory items and includes features such as authentication for secure access.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)
- [License](#license)

## Features
- **Inventory Management**: Add, view, update, and delete inventory items.
- **Authentication**: Secure user authentication and authorization (to be implemented).
- **Responsive Design**: User-friendly interface for seamless experience on different devices.
- **Scalable Architecture**: Modular design for easy scalability and maintenance.

## Tech Stack
### Backend:
- **Node.js**: JavaScript runtime for the server-side logic.
- **TypeScript**: Strongly-typed JavaScript for maintainability and scalability.
- **Express.js**: Web framework for building RESTful APIs.
- **PostgreSQL**: Relational database for storing inventory data.

### Frontend:
- **React.js**: JavaScript library for building user interfaces.
- **TypeScript**: Ensures type safety for the frontend code.
- **SCSS**: CSS preprocessor for styling.

### Tools and Libraries:
- **dotenv**: For managing environment variables.
- **jsonwebtoken**: For handling authentication (to be implemented).
- **pg**: PostgreSQL client for Node.js.
- **Vite**: Fast development server and build tool for the frontend.

## Setup and Installation

### Prerequisites
- Node.js installed on your machine.
- PostgreSQL installed and running.
- Git installed for version control.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/quickstock.git
   ```

2. Navigate to the project directory:
   ```bash
   cd quickstock
   ```

3. Install dependencies for both the backend and frontend:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the `backend` folder with the following variables:
     ```env
     DATABASE_URL=postgresql://username:password@localhost:5432/quickstock
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```

5. Start the development servers:
   - Backend:
     ```bash
     cd backend
     npm run dev
     ```
   - Frontend:
     ```bash
     cd frontend
     npm run dev
     ```

6. Open the application:
   - Frontend: Visit `http://localhost:3000`.
   - Backend API: Visit `http://localhost:5000`.

## Project Structure
```
quickstock/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts
│   │   ├── controllers/
│   │   │   └── itemsController.ts
│   │   ├── models/
│   │   │   └── itemModel.ts
│   │   ├── routes/
│   │   │   └── itemsRoutes.ts
│   │   ├── middlewares/
│   │   │   └── errorMiddleware.ts
│   │   └── index.ts
│   ├── .env
│   ├── package.json
│   ├── tsconfig.json
│   └── nodemon.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.tsx
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
└── README.md
```

## Usage
1. **Add Inventory Items**: Add new items to the inventory with details like name, quantity, and price.
2. **View Inventory**: Browse through the list of items in the inventory.
3. **Edit Inventory Items**: Update details for existing inventory items.
4. **Delete Inventory Items**: Remove items from the inventory.

## Future Enhancements
- **Authentication and Authorization**: Implement secure login and user roles (e.g., admin, manager).
- **Reporting**: Generate reports on inventory usage and trends.
- **Real-Time Updates**: Add WebSocket support for real-time inventory updates.
- **Mobile Support**: Enhance the frontend for better mobile compatibility.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

