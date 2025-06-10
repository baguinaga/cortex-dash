# CortexDash: A Config-Driven Dashboard with Data Visualizations

## Current Status & Test Deploy

This project is currently in a **Pre-MVP Test Deployment** phase.

### Chart and Table representational components are still under development

#### Currently

- **Frontend:** Deployed on Vercel.
- **Backend:** Deployed on Render, serving fixed mock data.

The purpose of this deployment is to showcase the application's architecture, user interface, and core config-driven features.

All known issues, architectural debt, and post-MVP features are being formally tracked in our [**Issue Tracker**](_docs/ISSUE_TRACKER.md).

The next major milestone is the full MVP release, which will involve connecting the backend to a live PostgreSQL database populated with more extensive, realistic data.

---

CortexDash is an advanced, full-stack dashboard platform designed to showcase a modern, scalable, and reusable web architecture. The core innovation is its **config-driven design**, allowing for the rapid development and deployment of new, themed dashboards by defining a single TypeScript configuration file.

This approach minimizes hardcoded UI and logic, maximizing reusability and accelerating development. It's a strategic demonstration of building flexible, data-driven applications.

## Core Architectural Feature: Config-Driven UI

The entire platform is built around a central principle: a dashboard's layout, data sources, components, and even its visual theme are defined in a TypeScript configuration file.

- **One Config, One Dashboard:** A new dashboard instance, like "Pharmacy Analytics" or "Security Ops," is created by simply adding a new config file (e.g., `security.config.ts`).
  - _Note: API end points to be consumed are defined in the config but still require backend setup._
- **Dynamic Rendering:** The Next.js frontend dynamically imports the relevant config based on the URL and renders the entire user experience—from API calls to color schemes—based on that file.
- **Scalability by Design:** This architecture is built for extension. New features or entire dashboard verticals can be added with minimal changes to the core component library.

## Technology Stack

The project leverages a modern technology stack chosen for performance, foster developer experience, and scalability.

- **Frontend:**
  - **Framework:** Next.js 15 (App Router)
  - **Language:** React 19 & TypeScript
  - **UI:** Tailwind CSS v4, Shadcn/ui
  - **State Management:** Zustand
  - **Data Visualization:** Recharts
- **Backend:**
  - **Framework:** Python & Flask
  - **Database:** PostgreSQL (Production) / Mock Data (Dev)
- **Deployment:**
  - **Frontend:** Vercel
  - **Backend & DB:** Render

## Current Status: Multi-Theme Implementation, "Pharmacy Analytics" MVP

The project is planning to actively demonstrate its core architectural strength by supporting multiple, distinct dashboard configurations simultaneously.

### Development Roadmap

The immediate focus is on building out a **Pharmacy Analytics** dashboard as the second flagship theme. This will be followed by refining the **Pharmacy Analytics** theme and adding a third **Security Ops** dashboard post MVP.

This multi-theme approach serves as a direct proof-of-concept for the platform's flexibility and scalability. The current `pharmacy.config.ts` will power a dashboard showcasing key performance indicators such as:

- Patient Adherence (PDC) Scores
- Drug Rebate and Revenue Tracking
- Dispensing and Inventory Analytics

### Decoupled Development Workflow

To ensure stability and accelerate development, we are following a professional, decoupled workflow:

1. **API Contract First:** The data schemas for all pharmacy-related backend endpoints have been fully defined.
2. **Mock API Development:** A stable mock API is serving static, pre-defined JSON data that conforms to the API contract _(Using the Faker module)_
3. **Frontend Implementation:** The entire Next.js frontend is being built and perfected against this stable mock API, allowing the UI to be completed independently of the live backend.
