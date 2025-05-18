import { pgTable, serial, text, boolean, date } from 'drizzle-orm/pg-core';

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  isDone: boolean('is_done').default(false),
  dueDate: date('due_date').notNull(),
});
