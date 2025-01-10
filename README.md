# STON.fi Insight Dashboard

A real-time monitoring dashboard for STON.fi liquidity pools, providing insights into TVL, APR, and trading volumes.

## Features

- Real-time pool data monitoring
- TVL (Total Value Locked) tracking
- APR metrics (24h, 7d, 30d)
- Trading volume analytics
- Historical TVL visualization
- Mobile-responsive design
- Auto-refresh functionality

## Tech Stack

- React.js
- Chakra UI (for modern, responsive design)
- Axios (for API requests)
- Chart.js (for data visualization)
- TypeScript

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
  ├── components/
  │   ├── PoolTable.tsx
  │   ├── TVLChart.tsx
  │   └── RefreshButton.tsx
  ├── hooks/
  │   └── usePoolData.ts
  ├── types/
  │   └── index.ts
  ├── utils/
  │   └── api.ts
  └── App.tsx