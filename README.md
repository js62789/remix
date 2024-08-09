# js62789's Remix Utilities

This repository hosts a series of branches that serve the purpose of being a Remix template. I chose to store these templates in branches instead of directories to make updates more DRY, while having the added benefit of testing root-level integrations like Husky and VSCode settings.

## Available templates
Each one of these branches represents a Remix template. Use any one of these branch names to generate a new application.
- typescript
- express
- express-socket
- fastify
- fastify-socket
- prisma
- sessions

## Creating a new Remix app

Both `npm init remix` and `npx create-remix` cache scripts aggressively, so in order to run the latest version of this script, you'll need to use `npx create-remix@latest`.

This is an example of how you would create a new application based on the Typescript template

`npx create-remix@latest packages/test-app --template https://github.com/js62789/remix/tree/typescript`
