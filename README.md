# Scholr 🎓

> Learn. Build. Get Certified.

[![Tests](https://github.com/Somyabhawsar45/Schlor/actions/workflows/test.yml/badge.svg)](https://github.com/Somyabhawsar45/Schlor/actions)
[![License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/Somyabhawsar45/Schlor/blob/main/LICENSE)
[![Status](https://img.shields.io/badge/status-live-success)](https://schlor.vercel.app)

**[Live Demo](https://schlor.vercel.app)** · **[API Docs](https://web.postman.co/workspace/Somya-Bhawar~5780f1dc-7f58-4a08-a8d7-2812646772cc/collection/41251947-a56f6203-7cad-42a4-afaf-1ba33ca32cd5?action=share&source=copy-link&creator=41251947)** · **[Issues](https://github.com/Somyabhawsar45/Schlor/issues)**

---

## Overview

Schlor is a full-stack EdTech platform built on the MERN stack with three distinct user roles, OTP-verified signup, video course delivery, and auto-generated PDF certificates on course completion.

Not a tutorial clone — every architectural decision was made from scratch including RBAC middleware, Brevo HTTP API migration, and on-demand Puppeteer PDF rendering.

---

## Original Features

| Feature | Detail |
|---|---|
| 🔐 OTP Auth | Email verification via Brevo HTTP API |
| 🛡️ RBAC | Role guards at middleware level, not controller level |
| 📄 PDF Certificates | Auto-issued on 100% completion, rendered by Puppeteer |
| 🔍 Public Verification | Every certificate verifiable by unique ID |
| 📊 Analytics Dashboard | Enrollment + revenue charts via Recharts |
| ✅ Integration Tests | 19 tests across auth, courses, certificates |

---

## Role Matrix

| Action | Student | Instructor | Admin |
|---|---|---|---|
| Browse courses | ✅ | ✅ | ✅ |
| Enroll | ✅ | ❌ | ❌ |
| Create courses | ❌ | ✅ | ❌ |
| Manage categories | ❌ | ❌ | ✅ |
| Download certificate | ✅ | ❌ | ❌ |
| View analytics | ❌ | ✅ | ✅ |

---

## Tech Stack

`React` `Redux Toolkit` `Tailwind CSS` `Node.js` `Express` `MongoDB` `Mongoose` `JWT` `bcrypt` `Brevo` `Cloudinary` `Puppeteer` `Recharts` `Jest` `Supertest`

---

## Architecture
┌──────────┐    ┌──────────┐    ┌──────────┐

│  Student  │    │Instructor│    │  Admin   │

└────┬─────┘    └────┬─────┘    └────┬─────┘

└───────────────┼───────────────┘

▼

┌───────────────────────┐

│    React Frontend     │

│  Tailwind + Redux     │

└───────────┬───────────┘

│ REST API

▼

┌───────────────────────┐

│    Express Backend    │

├───────────────────────┤

│  JWT Auth Middleware  │

│  RBAC Role Guards     │

│  PDF Generator        │

│  Brevo Email Service  │

└───────┬───────────────┘

│

┌──────────┴──────────┐

▼                     ▼

┌───────────┐       ┌─────────────────┐

│  MongoDB  │       │   Cloudinary    │

│ (Database)│       │ (Media Storage) │

└───────────┘       └─────────────────┘

---

## API

📬 [Postman Documentation](https://web.postman.co/workspace/Somya-Bhawar~5780f1dc-7f58-4a08-a8d7-2812646772cc/collection/41251947-a56f6203-7cad-42a4-afaf-1ba33ca32cd5?action=share&source=copy-link&creator=41251947)
POST   /api/v1/auth/sendotp                    → Send OTP

POST   /api/v1/auth/signup                     → Register

POST   /api/v1/auth/login                      → Login
GET    /api/v1/course/getAllCourses             → Public listing

POST   /api/v1/course/createCourse             → Instructor only
GET    /api/v1/certificate/check/:courseId     → Check eligibility

GET    /api/v1/certificate/download/:courseId  → Download PDF

GET    /api/v1/certificate/verify/:id          → Public verify

---

## Tests

```bash
npm test
```
PASS  tests/auth.test.js

PASS  tests/course.test.js

PASS  tests/certificate.test.js
Tests: 19 passed, 19 total

---

## Challenges Solved

**Brevo Migration** — Nodemailer SMTP failed silently in production. Switched to Brevo HTTP API for reliable OTP delivery with proper error handling.

**RBAC at middleware level** — Role verification happens before controllers run. Unauthorized requests never reach business logic.

**PDF on demand** — Certificates render in memory via Puppeteer on each request. Zero storage cost, always fresh.

**Test isolation** — All 19 tests run against `mongodb-memory-server`. No real data touched, clean state after every test.

---

## Local Setup

```bash
git clone https://github.com/Somyabhawsar45/Schlor.git
cd Schlor/server && npm install && npm run dev
cd Schlor/client && npm install && npm start
```

---

## License

MIT © [Somya Bhawsar](https://github.com/Somyabhawsar45)
