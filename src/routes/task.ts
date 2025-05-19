import { Router, Request, Response } from 'express';
import { db } from '../db';
import { tasks } from '../db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const router = Router();

// Define the task schema using Zod
const taskSchema = z.object({
  title: z.string(), 
  isDone: z.boolean().optional(),
  dueDate: z.string(),
});

//Insert a new task
router.post('/', async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, isDone, dueDate } = req.body;

    // Validate input
    const validate = taskSchema.safeParse(req.body);
    if (!validate.success) {
      return res.status(400).json({ error: 'Invalid input data or missing fields' });
    }

    // Insert the task into the database
    const result = await db.insert(tasks).values({title, isDone: isDone ?? false, dueDate,}).returning();

    res.status(201).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task.' });
  }
});

//Get all tasks
router.get('/', async (req: Request, res: Response): Promise<any> => {
  try {
    const result = await db.select().from(tasks);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks.' });
  }
});

//Get a task by ID
router.get('/:id', async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const taskId = parseInt(id, 10);

    // Validate taskId
    if(isNaN(taskId)){
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    //Serch for the task in the database
    const result = await db.select().from(tasks).where(eq(tasks.id, taskId));
    if (result.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(result[0]);

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch task.' });
  }
});

router.put('/:id', async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const taskId = parseInt(id, 10);
    const { title, isDone, dueDate } = req.body;

    // Validate taskId
    if(isNaN(taskId)){
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    // Validate input
    const validate = taskSchema.safeParse(req.body);
    if (!validate.success) {
      return res.status(400).json({ error: 'Invalid input data or missing fields' });
    }

    // Update the task in the database
    const result = await db.update(tasks).set({ title, isDone, dueDate }).where(eq(tasks.id, taskId)).returning();
    
    // Check if the task was found
    if (result.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task.' });
  }
})

router.delete('/:id', async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const taskId = parseInt(id, 10);

    // Validate taskId
    if(isNaN(taskId)){
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    // Delete the task from the database
    const result = await db.delete(tasks).where(eq(tasks.id, taskId)).returning();
    
    // Check if the task was found
    if (result.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task.' });
  }
})

export default router;