import { Router } from 'express';
import { db } from '../db';
import { tasks } from '../db/schema';
import { eq } from 'drizzle-orm';

const router = Router();

// Create
router.post('/', async (req, res) => {
  const { title, isDone, dueDate } = req.body;
  const result = await db.insert(tasks).values({ title, isDone, dueDate }).returning();
  res.json(result);
});

// Read all
router.get('/', async (_, res) => {
  const result = await db.select().from(tasks);
  res.json(result);
});

// Read by ID
router.get('/:id', async (req, res) => {
  const result = await db.select().from(tasks).where(eq(tasks.id, Number(req.params.id)));
  res.json(result[0]);
});

// Update
router.put('/:id', async (req, res) => {
  const { title, isDone, dueDate } = req.body;
  const result = await db.update(tasks)
    .set({ title, isDone, dueDate })
    .where(eq(tasks.id, Number(req.params.id)))
    .returning();
  res.json(result[0]);
});

// Delete
router.delete('/:id', async (req, res) => {
  const result = await db.delete(tasks).where(eq(tasks.id, Number(req.params.id))).returning();
  res.json(result[0]);
});

export default router;
