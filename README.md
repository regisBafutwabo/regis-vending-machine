## Vending Machine Prototype

### Overview
A modern web-based vending machine application built with Next.js 15, TypeScript, and Tailwind CSS. The application simulates a real vending machine interface with product selection, payment processing, and system status monitoring.
#### Preview Link: https://regis-vending-machine.vercel.app
### Diagram 
 ![Vending Machine Prototype Diagram](https://github.com/regisBafutwabo/regis-vending-machine/blob/main/public/vending-machine-activity-diagram.png)
### Tech Stack
 - Framework: Next.js 15
 - Language: TypeScript
 - Styling: Tailwind CSS
 - State Management: [Zustand](https://github.com/pmndrs/zustand)

### Features
 - Product selection
 - Payment processing
 - Admin panel for testing purposes
 - Real time status log

### Project Structure
```
.src/
├── app/
│   └── page.tsx           # Main application page
├── components/
│   ├── ActionSection/     # Action buttons
│   ├── AdminPanel/        # Admin panel for testing
│   ├── BeverageSelection/ # Product selection interface
│   ├── Header/            # Header component
│   ├── PaymentSelection/  # Payment processing interface
│   ├── Screen/            # System status display
│   └── ui/               # Shared UI components
├── store/
│   ├── inventoryStore.tsx # Product inventory store
│   ├── userCardStore.tsx # User card store
│   └── vendingStore.tsx  # Vending machine store
├── types/               # Type definitions
└── utils/               # Utility functions
```

### Installation
1. Clone the repository
2. Install dependencies with `npm install` or `yarn install`
3. Run the development server with `npm run dev` or `yarn dev`
4. Open http://localhost:3000 in your browser

### Development Guidelines
 #### Code Style
 - Use TypeScript for type safety
 - Follow ESLint and Prettier configurations
 - Use meaningful component and variable names
  
#### Component Structure
 - Keep components focused and single-responsibility
 - Use composition over inheritance
 - Implement proper error handling
 - Follow React best practices
