 🏙️ Urban Company Booking Management System

This is a full-stack booking management system built to manage service bookings like carpenter appointments. The project is divided into two parts:

- 🔧 **Backend**: NestJS + TypeORM + PostgreSQL
- 🎨 **Frontend**: React + Vite + TypeScript + tsilwind css

---

## 📁 Folder Structure

```

urban-company-booking-management/
├── urban-booking-backend/   # NestJS backend (API, DB, modules)
└── urban-booking-frontend/  # React frontend (UI, pages, services)

````

---

 ⚙️ Backend Overview (`urban-booking-backend`)

- **Framework**: NestJS (modular, scalable architecture)
- **Database**: PostgreSQL with TypeORM
- **Modules**:
  - `Bookings`: Handles service booking
  - `Slots`: Manages time slots
  - `Carpenter`: Sample service provider
- **DTOs & Repositories**: For clean code and type safety
- **Config**: `data-source.ts` for DB, `.env` for secrets

 ✅ Key Features
- Slot booking with conflict prevention
- REST API endpoints for CRUD operations
- Clean service-repository separation
- Factory pattern used in services
- Easily extendable modules

---

 🎨 Frontend Overview (`urban-booking-frontend`)

- **Framework**: React (with Vite for fast dev)
- **Language**: TypeScript
- **Pages**:
  - `Home.tsx`: Landing page
  - `SlotBooking.tsx`: Slot selection & booking
  - `ReviewBooking.tsx`: Booking confirmation
- **Components**:
  - `Navbar.tsx`: Responsive navigation
  - `SlotCard.tsx`: Displays available slots
- **API Layer**: All API interactions centralized in `services/api.ts`

---

 🚀 Getting Started

# 1️⃣ Backend Setup

```bash
cd urban-booking-backend
npm install
# Create PostgreSQL DB & update `data-source.ts`
npm run start:dev
````

### 2️⃣ Frontend Setup

```bash
cd urban-booking-frontend
npm install
npm run dev
```

---

## 🧑‍💻 Developed By

**Nitish Gupta**
[GitHub Profile](https://github.com/NitishGuptaTech)

---

 📌 Future Enhancements

* ✅ Authentication & Authorization
* ✅ Admin dashboard
* ✅ Payment gateway integration
* ✅ Email & SMS notifications

---

 🌐 Live Demo (Coming Soon...)

Stay tuned for deployment details!
--------------------------------------------------------------------------------------
