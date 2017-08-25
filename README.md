# duo-node-server

A node server boilerplate

## Tech Stacks
- typescript
- koa

## Getting Started

`npm install`

For development

`npm run dev`

## Files

- controller should only contain high level commands
- controller should NOT handle command call errors, leave it to the error handler, if possible
- service should check the input and output and throw errors if necessary