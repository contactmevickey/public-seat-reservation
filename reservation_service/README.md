# Public Seat Reservation Platform - Backend

## Overview

This project is a backend service for a public seat reservation platform.

The application allows authenticated users to:

- Login
- View available seats
- Reserve a seat
- Complete payment (mocked with API)
- Confirm seat reservation

---

## Technology Stack

- Node.js
- NestJS 11
- TypeScript
- Prisma ORM
- MySQL
- JWT Authentication
- Swagger API Documentation

---

## Prerequisites

Install:

- Node.js 22+
- MySQL 8+
- npm

Verify:

```bash
node -v
npm -v
mysql --version
```

---

## Database Setup

Create a database:

```sql
CREATE DATABASE seat_reservation;
```

---

## Environment Variables

Create a `.env` file in the project root.

```env
DATABASE_URL="mysql://root:password@localhost:3306/seat_reservation"

JWT_SECRET="your-super-secret-key"
```

Update values based on your local MySQL configuration.

---

## Install Dependencies

```bash
npm install
```

---

## Prisma Setup

Generate Prisma client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev
```

---

## Seed Initial Seats

Seed the database with few seats.

```bash
npx ts-node prisma/seed.ts
```

---

## Start Backend Server

Development mode:

```bash
npm run start:dev
```

Application URL:

```text
http://localhost:3000
```

---

## Swagger Documentation

Swagger UI:

```text
http://localhost:3000/api
```

---

## Authentication

### Register User

```http
POST /auth/register
```

Request:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

---

## Seat Lifecycle

```text
AVAILABLE
    ↓
HELD
    ↓
RESERVED
```

---

## Reservation Lifecycle

```text
PENDING
    ↓
COMPLETED
```

or

```text
PENDING
    ↓
CANCELLED
```

---

## Reservation Expiry

When a seat is reserved:

- Seat is moved to HELD state.
- Reservation receives an expiresAt timestamp.
- Expiration duration is 5 minutes.

If payment is not completed before expiration:

- Reservation becomes CANCELLED.
- Seat becomes AVAILABLE again.

---

## Authentication Design

Access Token:

- JWT
- Short-lived token
- Used for API authorization

Refresh Token:

- JWT
- Valid for 90 days
- Stored as hash in database

Passwords:

- Hashed using bcrypt
- Plain text passwords are never stored

---

## Future Improvements

- Scheduled cleanup job for expired reservations
- Refresh token endpoint
- Payment provider integration
- Redis caching
- Docker support
- CI/CD pipeline

---
