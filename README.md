# n8n-ingedata-pulse

This package provides n8n nodes for integration with Ingedata's Pulse platform.

## Features

- **Account Read Node**: Read user account information from the Pulse API
  - Get current user account information
  - Get user account by ID

## Installation

```bash
npm install n8n-ingedata-pulse
```

Or if you're using pnpm:

```bash
pnpm add n8n-ingedata-pulse
```

## Setup

1. Add your Pulse API credentials in n8n:
   - API Key
   - API Secret
   - API URL (defaults to https://pulse.ingedata.ai)

2. Use the nodes in your workflows

## Development

### Prerequisites

- Node.js (v16 or later)
- pnpm

### Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Build the project:
   ```bash
   pnpm build
   ```

### Development
1. Run local dev, this will watch any changes to your `./src` files
   ```bash
   pnpm dev
   ```
   Optional to watch changes with icons:
   ```bash
   pnpm dev:icons
   ```
2. Run docker compose
   ```bash
   docker compose up
   ```
3. Go to http://localhost:5678

**Note**: You will need to restart docker compose to reload the n8n node as n8n currently have issue with with linking node correctly to n8n.

### Testing

Run the tests:

```bash
pnpm test
```

Run tests in watch mode:

```bash
pnpm test:watch
```

## Project Structure

- `src/credentials/` - Contains credential definitions
- `src/utils/` - Contains utility classes for API interaction
- `src/nodes/` - Contains the node implementations
- `src/__tests__/` - Contains tests for all components
- `index.ts` - Exports the credentials and nodes

## License

ISC
