import express from 'express';
import visitorsRouter from './routes/visitorsRoutes.js'; // Import the visitors router
import authRoutes from './routes/authRoutes.js'; // Import the auth routes
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';


const app = express();
const PORT = 5000;



// Middleware
app.use(bodyParser.json());
app.use(cookieParser())

app.use('/visitors', visitorsRouter); // Use the visitors router for '/visitors' endpoint

app.use('/auth', authRoutes);

app.get('/', (req, res) => res.send('Welcome to the VMS Backend!'));


app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
