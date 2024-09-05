const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


// Middleware
const app = express();
app.use(express.json());


// Allow requests from any origin with specific methods and credentials
const corsOptions = {
  origin: '*', // Allow any origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed methods
  credentials: true, // Allow cookies and other credentials
};
app.use(cors(corsOptions));
app.use((req, res, next) => {
  console.log(req.path, req.method);
  if (req.body) {
    console.log('Request body:');
    console.log(req.body);
  }  
  next();
});
app.get('/', (req, res) => {
  res.json('Hello, welcome to the backend!');
});


//middleware
app.use((req, res, next)=> {
    console.log(req.path, req.method);
    if (req.body) {
      console.log('Request body:');
      console.log(req.body);
    }  
    next();
})



// Routes
  app.use('/api/rooms', require('./src/routes/room'));
  app.use('/api/bookings', require('./src/routes/booking'));
  app.use('/api/roomTypes', require('./src/routes/roomType'));
  app.use('/api/admin', require('./src/routes/user'));





// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });


// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});