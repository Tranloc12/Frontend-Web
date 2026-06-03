<div align="center">
  <img src="https://storage.googleapis.com/futa-busline-web-cms-prod/futa_group_76b71bf386/futa_group_76b71bf386.svg" alt="Futa Group Logo" width="180" style="margin-bottom: 25px;"/>
  
  <h1 align="center" style="font-weight: 300; letter-spacing: 2px;">TRANSPORTATION MANAGEMENT SYSTEM</h1>
  <p align="center" style="font-size: 1.1em; color: #666; font-style: italic;">
    — FRONTEND APPLICATION PORTAL —
  </p>

  <p align="center" style="margin-top: 20px;">
    <img src="https://img.shields.io/badge/Framework-React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Routing-React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router" />
    <img src="https://img.shields.io/badge/Styling-Bootstrap_5-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap" />
    <img src="https://img.shields.io/badge/Deployment-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  </p>
</div>

<br/>

## 1. PROJECT OVERVIEW
This repository contains the front-end application for the Transportation Management System. Designed with an emphasis on minimalism, clarity, and enterprise-grade performance, the interface ensures a seamless booking experience for passengers and a robust management dashboard for administrators.

## 2. SYSTEM ARCHITECTURE

The application follows a modern Single Page Application (SPA) architecture, utilizing React Context for state management and Axios for RESTful communication.

```mermaid
graph TD
    %% Styling Definitions
    classDef user fill:#ffffff,stroke:#e8832a,stroke-width:2px,color:#1a1410,rx:5px,ry:5px;
    classDef core fill:#faf9f7,stroke:#c4b5a2,stroke-width:1px,color:#1a1410,rx:5px,ry:5px;
    classDef external fill:#f09a40,stroke:#e8832a,stroke-width:2px,color:#ffffff,rx:5px,ry:5px;
    classDef data fill:#ffffff,stroke:#cccccc,stroke-width:1px,stroke-dasharray: 5 5;

    %% Nodes
    User((Passenger / Admin)):::user
    
    subgraph UI Layer [User Interface Components]
        Home[Home / Landing]:::core
        Booking[Seat Booking & Checkout]:::core
        Dash[Admin Dashboard / Analytics]:::core
    end
    
    subgraph State Management [React Context & Reducers]
        AuthContext[Authentication State]:::core
        ChatContext[Live Chat State]:::core
    end
    
    subgraph Integration Layer [External Services]
        Payment[Payment Gateways]:::external
        Realtime[Firebase Realtime DB]:::external
        Maps[Geolocation & Tracking]:::external
    end
    
    Backend[(Spring Boot API Server)]:::external

    %% Connections
    User -->|Interacts| Home
    User -->|Interacts| Booking
    User -->|Interacts| Dash
    
    Home --> AuthContext
    Booking --> AuthContext
    Dash --> AuthContext
    
    Home --> ChatContext
    
    Booking -->|Processes| Payment
    ChatContext -->|Syncs| Realtime
    Dash -->|Fetches Data| Backend
    Booking -->|REST API| Backend
```

## 3. CORE MODULES

### Passenger Interface
*   **Interactive Seat Selection**: Real-time synchronization of seat availability mapped to physical bus layouts.
*   **Dynamic Pricing & Promotions**: Automated voucher validation and checkout recalculation.
*   **Digital Boarding Pass**: Instant PDF ticket generation and dynamic QR code generation for scanning at terminals.
*   **Omnichannel Payments**: Seamless integration with VNPay, PayPal, and digital wallets.
*   **AI Assistant & Live Chat**: Embedded floating widgets providing 24/7 automated support and human-agent routing.

### Administrator Dashboard
*   **Data Visualization**: Integrated Recharts providing interactive Line, Bar, and Pie charts for revenue and demographic analysis.
*   **Data Exportation**: One-click CSV/Excel report generation for accounting and auditing.
*   **Resource Management**: Full CRUD capabilities for route planning, fleet management, and staff assignments.

## 4. DIRECTORY STRUCTURE

```text
src/
├── components/           # Reusable UI modules
│   ├── booking/          # Checkout logic, Seat matrix, PDF generation
│   ├── chat/             # AI Assistant logic & Firebase integration
│   ├── manager/          # Administrative tables, charts, export modules
│   └── payment/          # Gateway integrations (VNPay, PayPal)
├── configs/              # Environment variables, API interceptors
├── contexts/             # Global state (UserContext, ChatContext)
├── services/             # Background tasks (Notifications, Geolocation)
├── utils/                # Pure functions (Date formatting, Currency formatting)
└── App.js                # Root router & Layout wrapper
```

## 5. DEPLOYMENT GUIDE

### Prerequisites
*   Node.js v16.x or higher
*   NPM package manager

### Local Environment Setup
```bash
# Clone the repository
git clone https://github.com/Tranloc12/Frontend-Web.git

# Navigate to the workspace
cd Frontend-Web/carmanagementweb

# Install required dependencies
npm install

# Start the development server
npm start
```
The application will launch on `http://localhost:3000`.

### API Configuration
To direct API calls to your local backend environment, modify `src/configs/Apis.js`:
```javascript
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/CarManagementApp/api";
```

<br/>
<div align="center">
  <hr style="width: 50%; border: 1px solid #eaeaea;" />
  <p style="color: #888; font-size: 0.9em; margin-top: 20px;">
    <i>Architected for Scalability, Designed for Excellence.</i>
  </p>
</div>
