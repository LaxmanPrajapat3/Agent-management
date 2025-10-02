 MERN Agent Distributor

A MERN stack web application for Admin Login, Agent Management, and CSV/XLSX Upload & Distribution.
The app allows the Admin to create/manage agents, upload contact lists, and distribute them equally among agents.

✨ Features

✅ Admin Authentication (JWT + bcrypt)
✅ Agent Management (CRUD operations)
✅ CSV/XLSX Upload with validation
✅ Automatic Distribution of contacts among agents
✅ Task Mapping stored in MongoDB
✅ Frontend Dashboard to view distributed lists
✅ Form Validation & Error Handling

🛠 Tech Stack

Frontend: React.js, Vite, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB + Mongoose

Authentication: JWT + bcrypt

File Upload/Parsing: Multer, csv-parser, xlsx

📂 Project Structure
/backend
  /models
  /routes
  /controllers
  server.js

/frontend
  /src
    /components
    /pages
    /services

.env
README.md

⚙️ Installation
1️⃣ Clone the repo
git clone https://github.com/LaxmanPrajapat3/Agent-management

cd Agent-management

2️⃣ Setup Backend
cd backend
npm install


Create a .env file in /backend with:

MONGO_URI=mongodb://localhost:27017/agentdb
JWT_SECRET=your_jwt_secret_key
PORT=5000


Start backend:

nodemon server.js

3️⃣ Setup Frontend
cd ../frontend
npm install

Start frontend:

npm run dev

🚀 API Endpoints
Auth

POST /api/auth/init → Create first admin

POST /api/auth/login → Login admin

Agents

POST /api/agents → Create agent

GET /api/agents → List all agents

PUT /api/agents/:id → Update agent

DELETE /api/agents/:id → Delete agent

Lists

POST /api/lists/upload → Upload CSV/XLSX & distribute

GET /api/lists/:agentId → Get agent’s assigned list

🖼 Screenshots
🔐 Login Page
<img width="1917" height="961" alt="Screenshot 2025-10-02 142916" src="https://github.com/user-attachments/assets/964787be-8f9c-4132-ae03-a39798d32d16" />


📋 Dashboard
<img width="1919" height="909" alt="Screenshot 2025-10-02 143110" src="https://github.com/user-attachments/assets/80940c43-a50e-4305-8cc8-bf5732c07cb9" />

📂 CSV Upload & Distribution
<img width="1913" height="911" alt="Screenshot 2025-10-02 143126" src="https://github.com/user-attachments/assets/af91bd7d-88a9-4476-aa8a-4d22ef17eaf4" />

👨‍💻 Author

Built with ❤️ by Laxman Prajapat
