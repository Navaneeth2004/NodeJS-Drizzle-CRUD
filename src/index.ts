import express from 'express';
import taskRoutes from './routes/task';
import { setupSwagger } from './swagger';

const app = express();
app.use(express.json());

app.use('/tasks', taskRoutes);
setupSwagger(app);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
