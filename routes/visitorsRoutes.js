import express from 'express';
import { createVisitor, deleteVisitorById, getVisitors, getVisitor, updateVisitorById } from '../controllers/visitorsController.js';


const router = express.Router(); //initialize the router


// Define a route for GET requests to '/visitors'
router.get('/', getVisitors);

// Define a route for POST requests to '/visitors'
router.post('/', createVisitor);

// Define a route to get a visitor by ID
router.get('/:id', getVisitor);

// Define a route to delete a visitor by ID
router.delete('/:id', deleteVisitorById);

// Define a route to update a visitor by ID
router.patch('/:id', updateVisitorById)

// Export the router to be used in other files
export default router;