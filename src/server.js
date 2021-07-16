import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import listEndpoints from 'express-list-endpoints';
import destinationRouter from './services/destination/index.js';
import accommodationsRoute from './services/accommodation/index.js';
import {
  badRequestErrorHandler,
  notFoundErrorHandler,
  forbiddenErrorHandler,
  catchAllErrorHandler,
} from './errorHandlers.js';

dotenv.config();
const port = process.env.PORT || 4000;

// ******************* MIDDLEWARES *********************

const server = express();
server.use(cors());
server.use(express.json());

// ******************** ROUTES ***********************

server.use('/acc', accommodationsRoute);
server.use('/destination', destinationRouter);

// ******************* ERROR HANDLERS *********************

server.use(badRequestErrorHandler);
server.use(notFoundErrorHandler);
server.use(forbiddenErrorHandler);
server.use(catchAllErrorHandler);

console.table(listEndpoints(server));

mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB 🌵');
    server.listen(port, () => {
      console.log('Server listening on port', port, '✅');
    });
  })
  .catch((err) => console.log(err));

// mongoose.connect(process.env.MONGO_CONNECTION, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// mongoose.connection.on('connected', () => {
//   server.listen(port, () => {
//     console.log('Server running on port: ', port);
//   });
// });

// mongoose.connection.on('error', (err) => {
//   console.log('Mongo connection error ', err);
// });

export default server;
