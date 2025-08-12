import { v4 as uuidv4 } from 'uuid';

export let visitors = [];

export const createVisitor = (req, res) => {
  const visitor = req.body;

  visitors.push({...visitor, id: uuidv4()});

  res.send('Visitor added successfully');
}

// Get all visitors
export const getVisitors = (req, res) => {
  console.log(visitors);
  res.send(visitors);
};

// Get a visitor by ID
export const getVisitor = (req, res) => {
  const { id } = req.params;

  const foundVisitor = visitors.find((visitor) => visitor.id === id);
  res.send(foundVisitor || 'Visitor not found');
};

// Delete a visitor by ID
export const deleteVisitorById = (req, res) => {
  const { id } = req.params;  

 visitors = visitors.filter((visitor) => visitor.id !== id);

  res.send(`Visitor with id ${id} deleted successfully`);
};

// Update a visitor by ID
export const updateVisitorById = (req, res) => {
  const { id } = req.params;  
  const {visitorName, host, reason, date, checkInTime, checkOutTime, visitorStatus} = req.body

  const visitorToUpdate = visitors.find((visitor) => visitor.id === id);
  if (!visitorToUpdate) {
    return res.status(404).send('Visitor not found');
  }

  if (visitorName) visitorToUpdate.visitorName = visitorName;
  if (host) visitorToUpdate.host = host;  
  if (reason) visitorToUpdate.reason = reason;
  if (date) visitorToUpdate.date = date;
  if (checkInTime) visitorToUpdate.checkInTime = checkInTime;
  if (checkOutTime) visitorToUpdate.checkOutTime = checkOutTime;
  if (visitorStatus) visitorToUpdate.visitorStatus = visitorStatus;

  res.send(`Visitor with id ${id} updated successfully`);
  console.log(visitorToUpdate);
  
};