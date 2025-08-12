import express from 'express';
import visitorsRouter from './routes/visitorsRoutes.js'; // Import the visitors router

import bodyParser from 'body-parser';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use('/visitors', visitorsRouter); // Use the visitors router for '/visitors' endpoint

app.get('/', (req, res) => res.send('Welcome to the VMS Backend!'));


app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
