# 🧾 README – Data Collection & Approval System

## 🧠 Overview
This project is a simplified **Data Collection & Approval System**, where users can submit entries (like expense reports or survey responses), which are then validated and reviewed by an approver.  

The system consists of:
- A **Frontend (Vue 3)** interface for submitting and viewing data.  
- A **Backend (Node.js + Express)** API that manages data entries and approval workflows.  

---

## ⚙️ Setup & Running Instructions

### 🖥 Frontend (Vue 3)
1. Navigate to the frontend folder:
   ```bash
   cd data-approval-system
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open your browser at:  
   👉 [http://localhost:5173](http://localhost:5173)

### 💻 Backend (Node.js + Express)
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the server:
   ```bash
   npm run dev
   ```
4. The backend will run at:  
   👉 [http://localhost:5000](http://localhost:5000)

---

## 🎨 Design Decisions

### Problem Domain  
I chose to simulate a **data approval system** similar to expense or request management workflows.  
It’s simple enough to implement for a task, but realistic in showing my understanding of **forms, validation, API interaction, and state updates**.

### Why This Domain?  
Because it demonstrates:
- Real-world CRUD operations (Create, Read, Update).  
- Data validation and approval logic.  
- Dynamic UI updates and interactivity in Vue.  

---

## 🧰 Technology Stack

| Layer | Technology | Purpose |
|-------|-------------|----------|
| Frontend | Vue 3 (Vite) | Reactive UI and component system |
| State / HTTP | Axios | API communication |
| Styling | CSS (Vanilla) | Simple responsive styling |
| Backend | Node.js + Express | RESTful API for data management |
| Dev Tool | Nodemon | Auto-restart during development |
| Storage | In-memory array (for now) | Temporary data storage |

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1️⃣ Submit a new entry  
**POST** `/entries`  
**Body:**
```json
{
  "category": "Food",
  "amount": 120,
  "date": "2025-10-19",
  "notes": "Team lunch",
  "calculatedValue": "132.00"
}
```
**Response:**
```json
{
  "message": "Entry added successfully",
  "entry": { ... }
}
```

---

#### 2️⃣ Get all entries  
**GET** `/entries`  
**Response:**
```json
[
  {
    "id": 1739876789,
    "category": "Food",
    "amount": 120,
    "status": "Pending",
    ...
  }
]
```

---

#### 3️⃣ Approve an entry  
**PUT** `/entries/:id/approve`  
**Response:**
```json
{
  "message": "Entry approved",
  "entry": { ... }
}
```

---

#### 4️⃣ Reject an entry  
**PUT** `/entries/:id/reject`  
**Body:**
```json
{ "reason": "Invalid receipt" }
```
**Response:**
```json
{
  "message": "Entry rejected",
  "entry": { ... }
}
```

---

#### 5️⃣ Get statistics  
**GET** `/stats`  
**Response:**
```json
{
  "total": 10,
  "approved": 4,
  "pending": 3,
  "rejected": 3
}
```

---

## ⚖️ Assumptions & Limitations

- Data is stored in-memory (not persisted if the server restarts).  
- Authentication/authorization is not implemented.  
- Validation is basic (just field presence and value > 0).  
- The UI is designed for simplicity and clarity, not production-grade styling.

---

## 🚀 Future Improvements

If I had more time, I would:
1. **Add persistent storage** using a database (MongoDB / PostgreSQL).  
2. **Implement authentication** (Admin vs. User roles).  
3. **Enhance validation rules** with dynamic error messages.  
4. **Add pagination and search filters** in the dashboard.  
5. **Improve the UI** using a component library like Vuetify or Element Plus.  
6. **Add testing** (Vitest / Jest) for reliability.  

---

## 👩🏻‍💻 Author
**Alaa Mohammed**  
Frontend Developer | Software Engineering Graduate  
