import express from 'express';
import { UserRoutes } from './routes/userRoutes';
import bodyParser from 'body-parser';
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded())
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!!');
});

(async () => {
    try {
        const userRoutes = await new UserRoutes().initializeUserRoutes();
        app.use('/api/users', userRoutes);
    } catch (error) {
        console.error('Failed to initialize routes', error);
        process.exit(1);
    }
})();

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});