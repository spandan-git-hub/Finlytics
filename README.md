# Finlytics

A simple finance dashboard built to help users track their spending, view transactions, and understand basic financial patterns.

---

## Overview

Finlytics is a single-page application with three main views: Dashboard, Transactions, and Insights.

The goal was to keep the interface clean and intuitive while organizing the code in a way that’s easy to scale and maintain.

---

## Approach

The app is built using **React**, **Tailwind CSS**, **Zustand**, and **Recharts**.

It follows a feature-based structure, where each section (dashboard, transactions, insights) manages its own UI and logic.

State is split into:

* transactions (data and CRUD)
* UI state (filters, search, role)

Reusable UI components (cards, inputs, tables) are separated from feature-specific components to keep the design consistent across the app.

---

## Features

* **Dashboard**

  * Summary cards (balance, income, expenses)
  * Balance trend and spending breakdown charts
  * Recent transactions preview

* **Transactions**

  * Full transactions table
  * Search, filter, and sorting
  * Add/Edit/Delete (admin only)
  * Viewer mode (read-only)

* **Insights**

  * Highest spending category
  * Monthly comparison
  * Simple observations based on data

* **Role-based UI**

  * Toggle between Viewer and Admin
  * UI updates based on selected role

---

## Setup

```bash
git clone <repo-link>
cd finlytics
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

---
