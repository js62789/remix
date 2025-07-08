# React Router v7 Template

## Stack

- React Router v7
- React 18
- TypeScript
- Vite
- ESLint
- Husky
- CSS Modules
- Storybook

## Development

To start the development server:

```bash
npm install
npm run dev
```

This will start:
- Vite development server on `http://localhost:3000`
- CSS Modules watcher for automatic type generation

## Build

To build for production:

```bash
npm run build
```

## Project Structure

```
src/
  app/
    components/     # Reusable components
    routes/         # Route components
    root.tsx        # Root layout component
    routes.tsx      # Route configuration
  main.tsx          # Application entry point
```

## Adding Routes

Add new routes to `src/app/routes.tsx`. React Router v7 uses a declarative routing configuration.

## Linting

```bash
npm run lint        # Run all linters
npm run lint:js     # ESLint
npm run lint:css    # Stylelint
npm run lint:ts     # TypeScript
```

## Creating a new Remix app

Both `npm init remix` and `npx create-remix` cache scripts aggressively, so in order to run the latest version of this script, you'll need to use `npx create-react-router@latest`.

`npx create-react-router@latest packages/test-app --template https://github.com/js62789/remix/tree/typescript`
