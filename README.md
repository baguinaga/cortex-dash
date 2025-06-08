# CortexDash: Configurable Dashboard with Data Visualizations

CortexDash is an architecturally advanced, full-stack dashboard platform designed for scalable, reusable, and data-driven applications. It features a modern, composable front-end built with Next.js (App Router), React, TypeScript, Shadcn/ui, Recharts, and Zustand, integrated with a robust Python Flask back-end for API services.

The core innovation lies in its **config-driven architecture**, which enables rapid development and extension of new dashboard themes with minimal code changes. This approach allows configurations to consume diverse API endpoints, reuse existing modular components, and provide unique dashboard views relevant across various industries or tailored for specific user entitlements.

This design significantly improves reusability and maintainability, and showcasing scalable software engineering.

## 🚀 Key Features (Phase 1 MVP)

- **Config-Driven Architecture:** Dynamically renders dashboards based on centralized TypeScript configuration files, ensuring modularity and easy expansion.
- **Server-Side Data Fetching:** Utilizes Next.js App Router's Server Components for efficient data fetching and improved initial page load times.
- **Modern UI with Shadcn/ui:** Leverages a "copy & paste" component philosophy for highly customizable and optimized UI elements.
- **Interactive Data Visualizations:** Integrates Recharts for powerful and composable chart rendering.
- **Optimized State Management:** Employs Zustand for a minimalist and performant global state solution.
- **Robust Backend:** A Flask-based API serves as the data source, currently designed to mimic the frontend's data structure requirements with mock data.

## 💻 Tech Stack

**Front-End:**

- **Framework:** Next.js (App Router), React
- **Language:** TypeScript
- **UI Library:** Shadcn/ui (built on Radix UI & Tailwind CSS)
- **Charting:** Recharts
- **State Management:** Zustand

**Back-End:**

- **Framework:** Flask
- **Language:** Python
- **Database:** Postgres (SQLite, for dev) - **Currently serving Mock data for MVP**

## ✨ Architectural Highlights

The platform's design emphasizes:

- **Scalability & Reusability:** New dashboard themes can be introduced primarily by defining new configuration files, minimizing changes to core UI logic.
- **Performance:** Achieved through Next.js Server Components, client-side dynamic imports, and optimized bundle sizes.
- **Developer Experience:** Clean project structure, clear separation of concerns, and modern tooling.

## 🌐 Live Demo

A live demonstration of the "Healthcare Operations" dashboard, showcasing the core MVP functionality, will be available soon.
Stay tuned for the link!
