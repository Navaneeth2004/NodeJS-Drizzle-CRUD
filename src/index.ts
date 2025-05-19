import express from 'express';
import router from './routes/task';
import { setupSwagger } from './swagger';
import { pool } from './db';

const app = express();
app.use(express.json());

app.use('/tasks', router);
setupSwagger(app);

const PORT = 3000;

//Check database connection
async function startServer() {
    try {
        await pool.query('SELECT 1');
        console.log('Connected to the database');
        app.listen(PORT, () => {console.log(`Server running on port ${PORT}`);})
    } catch (error) {
        console.error('Failed to Connect to the database: :', error)
    }
}

startServer();