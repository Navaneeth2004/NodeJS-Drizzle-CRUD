import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Task API',
    version: '1.0.0',
  },
  paths: {
    '/tasks': {
      get: { summary: 'Get all tasks', responses: { 200: { description: 'OK' } } },
      post: {
        summary: 'Create a task',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  isDone: { type: 'boolean' },
                  dueDate: { type: 'string', format: 'date' }
                },
                required: ['title', 'dueDate']
              }
            }
          }
        },
        responses: { 201: { description: 'Created' } }
      },
    },
    '/tasks/{id}': {
      get: { summary: 'Get a task by ID', responses: { 200: { description: 'OK' } } },
      put: {
        summary: 'Update a task',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  isDone: { type: 'boolean' },
                  dueDate: { type: 'string', format: 'date' }
                },
                required: ['title', 'dueDate']
              }
            }
          }
        },
        responses: { 200: { description: 'Updated' } }
      },
      delete: { summary: 'Delete a task', responses: { 200: { description: 'Deleted' } } },
    }
  }
};

export const setupSwagger = (app: Express) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
