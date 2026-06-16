# Public Seat Reservation Platform - Backend

## Overview
A React + TypeScript frontend application for a Public Seat Reservation Platform.

This application allows authenticated users to:

* Login using JWT authentication
* View seat availability in real time
* Reserve available seats
* Hold seats temporarily for payment
* Complete payment and confirm booking
* Automatically refresh expired access tokens using refresh tokens

---

## Tech Stack

* React 19
* TypeScript
* Vite
* React Router
* Axios
* TanStack React Query
* JWT Authentication
* CSS

---

## Features

Authentication

* User Login
* JWT Access Token (15 mins)
* Refresh Token (90 days)
* Protected Routes
* Automatic Access Token Refresh on 401 responses
* Logout functionality

## Seat Reservation

* View all seats
* Status-based seat rendering:
    * Available
    * Held
    * Reserved
* Reserve available seats
* Confirmation modal before reservation
* Payment action for seats held by the logged-in user
* Success page after booking

## User Experience

* Responsive card-based UI
* Color-coded seat statuses
* Centered popup modal
* Automatic seat refresh after actions
* Success confirmation screen

---

## Installation

```bash
npm install
npm run dev
http://localhost:5173
```

---
