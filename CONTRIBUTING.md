# Contributing to MalChart

Thank you for your interest in contributing to MalChart! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful and considerate in all interactions. We aim to foster an inclusive and welcoming community.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- A clear, descriptive title
- Steps to reproduce the problem
- Expected vs actual behavior
- Screenshots if applicable
- Your environment (OS, browser, Node version)

### Suggesting Features

Feature requests are welcome! Please create an issue describing:
- The problem your feature would solve
- How you envision the feature working
- Any alternative solutions you've considered

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Submit a pull request** with a clear description

## Development Setup

1. Clone your fork:
```bash
git clone https://github.com/YOUR_USERNAME/MalChart.git
cd MalChart
```

2. Install dependencies:
```bash
# Frontend
npm install

# Backend
cd server
npm install
```

3. Start development servers:
```bash
# Backend (in server directory)
npm run dev

# Frontend (in root directory)
npm start
```

## Coding Standards

### JavaScript/React

- Use functional components with hooks
- Follow ESLint configuration (no warnings)
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components focused and reusable

### CSS

- Use CSS modules or separate CSS files per component
- Follow existing naming conventions
- Use CSS variables for theming
- Ensure responsive design

### Git Commits

- Use clear, descriptive commit messages
- Start with a verb (Add, Fix, Update, Remove, etc.)
- Keep commits focused on a single change
- Reference issues when applicable

Examples:
```
Add search functionality to SeasonalChart
Fix year navigation bug in Navbar
Update README with deployment instructions
```

## Testing

- Test your changes on different browsers
- Test responsive design on mobile devices
- Verify API integration works correctly
- Check for console errors

## Project Structure

```
MalChart/
├── src/
│   ├── components/     # React components
│   ├── services/       # API and service layer
│   ├── utils/          # Utility functions
│   └── styles/         # Global styles
├── server/
│   ├── routes/         # API routes
│   ├── services/       # Backend services
│   └── server.js       # Main server file
└── public/             # Static assets
```

## Component Guidelines

### Creating a New Component

1. Create a new directory in `src/components/`
2. Create the component file (e.g., `MyComponent.jsx`)
3. Create the CSS file (e.g., `MyComponent.css`)
4. Export the component

Example structure:
```jsx
import React from 'react';
import './MyComponent.css';

const MyComponent = ({ prop1, prop2 }) => {
  return (
    <div className="my-component">
      {/* Component content */}
    </div>
  );
};

export default MyComponent;
```

### Component Best Practices

- Use PropTypes or TypeScript for type checking (future enhancement)
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use meaningful prop names
- Document complex components

## API Integration

### Using the Backend API

```javascript
import { getSeasonalAnime } from '../services/animeService';

const data = await getSeasonalAnime(2024, 'winter');
```

### Adding New API Endpoints

1. Add route in `server/routes/`
2. Implement service logic in `server/services/`
3. Update API documentation
4. Add frontend service function

## Style Guide

### Naming Conventions

- **Components**: PascalCase (e.g., `AnimeCard`)
- **Files**: PascalCase for components, camelCase for utilities
- **CSS Classes**: kebab-case (e.g., `anime-card`)
- **Variables**: camelCase (e.g., `currentSeason`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)

### Code Formatting

- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons
- Add trailing commas in objects and arrays

## Documentation

When adding new features:
- Update README.md if user-facing
- Add JSDoc comments for functions
- Update DEPLOYMENT.md for infrastructure changes
- Keep code comments up to date

## Questions?

If you have questions:
- Check existing issues and discussions
- Create a new issue with the "question" label
- Join our community discussions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Recognition

Contributors will be recognized in the project documentation. Thank you for making MalChart better!
