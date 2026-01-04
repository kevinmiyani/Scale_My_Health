# Scale My Health

## Project Overview
- **What it does:** Scale My Health is a full-stack digital health platform that lets doctors and patients coordinate appointments, clinical cases, prescriptions, and real-time consults from a mobile experience.
- **Problem it solves:** It eliminates fragmented scheduling, manual follow-ups, and missed updates by providing a single source of truth for clinical interactions, guided by OTP-secure access and synchronous notifications.
- **Target users:** Doctors, patients, and care coordinators who need to book consultations, manage patient histories, and collaborate via video/audio wherever network coverage is available.
- **High-level workflow:** Patients log in with OTPs, request time slots, and receive push notifications; doctors maintain availability, review cases, issue prescriptions, and respond to live socket events; the React Native frontend communicates with an Express/Mongo backend that orchestrates data, cron jobs, push notifications, and WebRTC signaling through Socket.IO.

## Tech Stack
### Frontend
- React Native 0.75; Redux Toolkit for global state; React Navigation stack and bottom tabs.
- Axios for RESTful API calls; Socket.IO client for real-time events; Notifee/FCM for push alerts.
- Styling through React Native `StyleSheet` helpers and a centralized `src/constants/styles.js`.

### Backend
- Node.js 18+ runtime with Express.js; Socket.IO for WebSocket events; cron jobs for appointment lifecycle management.
- Firebase Admin SDK for push notifications; Twilio for OTP; Razorpay configuration scaffolding for payments (future proofed).

### Database
- MongoDB managed through Mongoose models (`Patient`, `Doctor`, `Appointment`, `Case`, `Prescription`).
- Relationships rely on ObjectId references stored inside nested documents to correlate users, appointments, and clinical records.

### Tools & Services
- Git for version control; Yarn v3.6.4 / npm for package management; Nodemon for backend dev server guardianship.
- Firebase Cloud Messaging, Twilio SMS, Socket.IO, Razorpay client hooks.
- Optional hosting via Vercel (configured) / any Node-capable cloud provider for backend APIs.

## Architecture Overview
- **Frontend ↔ Backend communication:** The React Native app hits `https://<YOUR_DOMAIN>/api/*` endpoints via Axios for CRUD operations, while Socket.IO keeps doctors and patients in sync through real-time appointment updates, chat signals, and video call handshakes.
- **REST API architecture:** Express routes are grouped per resource (`/patient`, `/doctor`, `/appointment`, `/case`, `/prescription`) and follow CRUD conventions with body validation, Mongo queries, and status messaging.
- **Authentication & authorization flow:** Patients authenticate via Twilio OTP (stored in-memory for short life) while doctors submit username/password credentials. On successful login the backend records FCM tokens, updates `lastLogin`, and channels session invalidation events through sockets (`login-expire`).
- **Data flow:** User interactions trigger frontend state updates (Redux) → Axios POST/PATCH to backend → backend persists to Mongo → cron jobs and controllers emit Socket.IO and Firebase notifications → frontend listens and updates UI.

---

## Frontend Overview
- Purpose: mobile interface for both patient and doctor journeys, managing onboarding, case history, appointment bookings, prescriptions, and real-time video/audio consults.
- Type: cross-platform React Native application with native modules for Android and iOS assets, push notifications, and WebRTC.

## Frontend Tech Stack
- **UI framework:** React Native with modular components (`components`, `screens`, `assets`).
- **State management:** Redux Toolkit (slices per feature such as Authentication, AppointmentList, DoctorsList, etc.).
- **Navigation / routing:** React Navigation stacks with bottom tabs via `src/navigation`.
- **Styling approach:** Shared style constants (`Colors`, `Fonts`, `Responsive`) + component-level `StyleSheet` definitions.

## Frontend Folder Structure
- `src/api/`: Axios helpers, Socket services, endpoint mappings.
- `src/components/`: Reusable widgets (buttons, cards, modals, forms) organized by feature.
- `src/redux/`: Slices, store, selector helpers, and shared constants.
- `src/screens/`: Feature screens (AppointmentBooking, DoctorHome, Cases, VideoCall, etc.).
- `src/navigation/`: Tab and stack configuration plus navigation helpers.
- `src/hooks/` & `src/utils/`: Custom hooks for notifications, uploads, validations, device info, and helper utilities.

## Frontend Features
- **Authentication (login / signup):** Patient OTP flow backed by Twilio; doctor login via username/password plus FCM token registration.
- **API integration:** Centralized Axios helpers call `/patient`, `/doctor`, `/appointment`, `/case`, `/prescription` endpoints; socket services emit/listen to appointment, prescription, and video-call events.
- **State management:** Redux Toolkit organizes data by domain (appointments, authentication, doctor listings) with selectors exposed via root reducer.
- **Error handling:** Toast messages (`ToastMessage`) communicate API errors; validators guard required fields before submission.
- **Performance optimizations:** Fast Image caching, optimized asset bundles, FlatList usage for long lists, and `react-native-fast-image` for accelerated image rendering.

## Frontend Setup & Installation
- **Prerequisites:** Node.js 18+, Yarn 3.6.4, React Native CLI, Xcode (iOS) / Android Studio (Android), CocoaPods.
- **Environment variables (example `.env`):**
  ```env
  REACT_NATIVE_API_DOMAIN=https://YOUR_API_URL
  REACT_NATIVE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
  REACT_NATIVE_FIREBASE_PROJECT_ID=YOUR_PROJECT
  REACT_NATIVE_FIREBASE_SENDER_ID=YOUR_SENDER_ID
  ```
- **Installation steps:**
  1. `cd Scale-My-Health-FE`
  2. `yarn install`
  3. `cd ios && pod install && cd ..` (for iOS)
  4. Create `.env` from template above
- **How to run locally:**
  - `yarn start` (Metro bundler)
  - `yarn android` (Android emulator/device)
  - `yarn ios` (iOS simulator/device)

## Frontend Scripts
- `yarn android`: Build and run APK on connected Android device/emulator.
- `yarn ios`: Launch the iOS app via Xcode CLI.
- `yarn start`: Start Metro bundler for development.
- `yarn lint`: Run ESLint across the project.
- `yarn test`: Execute Jest test suite.

---

## Backend Overview
- Purpose: Hosts REST APIs, WebSockets, cron jobs, and push-notification orchestration to support the mobile experience.
- Core responsibilities: user management, scheduling logic, prescription/case tracking, background jobs for appointment completion/holiday enforcement, and real-time signaling for consultations.

## Backend Tech Stack
- **Runtime & framework:** Node.js 18+ with Express.js, Nodemon for dev auto-reload.
- **Database:** MongoDB via Mongoose, storing patient, doctor, appointment, case, and prescription documents.
- **Authentication strategy:** OTP via Twilio for patients; simple username/password match for doctors; both flows register/upsert FCM tokens for push messaging.
- **ORM / query handling:** Native Mongoose models with aggregation pipelines (e.g., fetching patients per doctor).
- **Security & validation:** Basic validation in controllers, `dotenv` for secrets, CORS middleware, and WebSocket room checks; future additions could include request schemas/helmet.

## Backend Folder Structure
- `controllers/`: Encapsulates route logic for patients, doctors, appointments, cases, prescriptions.
- `routes/`: Feature-based routers mounted under `/api`.
- `models/`: Mongoose schemas for each resource, including nested subdocuments (qualifications, timeLines, etc.).
- `cron/`: Background jobs (`completeAppointments`, `manageDoctorHolidays`).
- `notification/`: Firebase Admin helpers for push/data-only notifications.
- `database/`: MongoDB connection helper.
- `socket.js`: Socket.IO server setup handling appointment/prescription/video-call events.

## API Design
- RESTful principles: Routes grouped by resource, use HTTP verbs (`GET`, `POST`, `PATCH`, `DELETE`), consistent success/error payloads.
- Sample endpoints:
  - `POST /api/patient/send-otp`: Request/validate OTP via Twilio.
  - `POST /api/patient/login`: Verify OTP, register patient session info.
  - `POST /api/doctor/login`: Credential-based login for doctors.
  - `POST /api/appointment/create`: Book appointment with date/time.
  - `PATCH /api/appointment/:id/reschedule`: Update appointment slot and broadcast socket events.
  - `POST /api/case/create`: Record medical history and link doctor/patient.
  - `POST /api/prescription/add`: Upload prescriptions tied to a case and notify users.

## Authentication & Authorization
- **Login/signup flow:** Patient OTPs are generated and sent via Twilio; doctor login uses stored username/password; both flows update FCM and last-login metadata.
- **Token-based authentication:** Current implementation avoids persistent JWTs; the backend relies on OTP validation and doctor credentials, while sockets respect room membership and emit `login-expire` events when sessions are terminated.
- **Role-based access:** API semantics differ per role, e.g., `/doctor` routes are used by doctors (timeline/specialty management) and `/patient` routes by patients; ACLs can be introduced by middleware in future iterations.

-## Backend Setup & Installation
- **Prerequisites:** Node.js 18+, MongoDB connection, Twilio account, Firebase service account JSON (copy `Scale-My-Health-Backend/scale-my-health-notification-firebase.example.json` to `Scale-My-Health-Backend/scale-my-health-notification-firebase.json`, fill in the real credentials, and keep the file out of version control—it is already ignored).
- **Environment variables (example `.env`):**
  ```env
  PORT=3000
  DATABASE_URL=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/scale-my-health
  TWILIO_ACCOUNT_SID=YOUR_SID
  TWILIO_AUTH_TOKEN=YOUR_TOKEN
  TWILIO_PHONE_NUMBER=+1234567890
  FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
  FIREBASE_CLIENT_EMAIL=YOUR_CLIENT_EMAIL
  FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
  ```
- **Installation steps:**
  1. `cd Scale-My-Health-Backend`
  2. `npm install`
  3. Create `.env` using template and place the Firebase service account file (per the prerequisite above) in `Scale-My-Health-Backend`.
- **How to run locally:**
  - `npm run start` (starts Nodemon + Express server + Socket.IO)

---

## Database Design
- **Database type:** MongoDB atlas or self-hosted replica set.
- **Key tables/entities:**
  - `patients`: personal, contact, FCM tokens, role designation.
  - `doctors`: profile, timelines, qualifications, holidays, FCM metadata.
  - `appointments`: references to patient/doctor, scheduled slot, status, prescription link.
  - `cases`: encapsulates history summaries, attachments, doctor/patient references.
  - `prescriptions`: linked to `case`, storing medicine details and attachments.
- **High-level relationships:** `Appointment` references both patient and doctor; `Case` nests patient snapshot + doctor reference; `Prescription` connects to `Case` and optionally to appointment IDs for audit trails.

---

## Environment Variables
- **Frontend example:**
  ```env
  REACT_NATIVE_API_DOMAIN=https://YOUR_API_DOMAIN
  REACT_NATIVE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
  REACT_NATIVE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
  REACT_NATIVE_FIREBASE_SENDER_ID=YOUR_SENDER_ID
  ```
- **Backend example:**
  ```env
  PORT=3000
  DATABASE_URL=YOUR_MONGODB_URI
  TWILIO_ACCOUNT_SID=YOUR_TWILIO_SID
  TWILIO_AUTH_TOKEN=YOUR_TWILIO_TOKEN
  TWILIO_PHONE_NUMBER=+1234567890
  FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
  FIREBASE_CLIENT_EMAIL=YOUR_FIREBASE_CLIENT_EMAIL
  FIREBASE_PRIVATE_KEY="YOUR_FIREBASE_PRIVATE_KEY"
  ```

---

## Deployment
- **Frontend deployment:** Build release binaries via `yarn android --variant=release` or `yarn ios --configuration Release`. Bundle assets with Metro and submit through Play Store / App Store Connect; configure Crashlytics/Analytics as needed.
- **Backend deployment:** Deploy Express server to Node-capable cloud (e.g., Vercel serverless functions, Heroku, Render, or AWS EC2). Provide Mongo URI, Twilio, and Firebase credentials as secrets, enable CORS for mobile clients, and ensure Socket.IO connection upgrading is supported.
- **Environment configuration notes:** Keep Firebase service account out of version control, rotate Twilio credentials, and allow HTTPS-only endpoints for production API_DOMAIN.

## Security Considerations
- **Authentication security:** OTP retention is short-lived; doctor credentials should eventually be hashed instead of plain text; FCM tokens are reset before storing to avoid duplicates.
- **API protection:** CORS, body parsing limits, and socket room checks limit unsolicited access; future improvements can include rate limiting and helmet.
- **Data validation:** Controllers guard against missing fields; front-end validation prevents malformed submissions; Mongo `_id` populations rely on trusted ObjectIds.

## Future Improvements
- **Scalability:** Introduce pagination, caching of doctor lists, and queueing for push notifications to handle higher volumes.
- **Feature enhancements:** Add patient-doctor chat transcripts, multi-tenant clinics, analytics dashboards, and prescription refill reminders.
- **Performance optimizations:** Adopt Redux selectors with memoization, batch API calls, and consider GraphQL or event-driven microservices for complex workflows.
