import express from 'express';
import AccModel from './Schema.js';

const accommodationsRoute = express.Router();

accommodationsRoute.post('/', async (req, res) => {
  try {
    const newAcc = new AccModel(req.body);
    const response = await newAcc.save();
    res.status(201).send(response);
  } catch (error) {
    console.log({ error: error });
    res.status(500).send('Generic server error');
  }
});
accommodationsRoute.get('/', async (req, res) => {
  try {
    const acc = await AccModel.find();
    res.status(200).send(acc);
  } catch (error) {
    console.log({ error: error });
    res.status(404).send('Not found!');
  }
});
accommodationsRoute.get('/:id', async (req, res) => {
  try {
    const acc = await AccModel.findById(req.params.id);
    res.status(200).send(acc);
  } catch (error) {
    console.log({ error: error });
    res.status(404).send('Not found!');
  }
});
accommodationsRoute.put('/:id', async (req, res) => {
  try {
    const updatedAcc = await AccModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );
    res.status(204).send(updatedAcc);
  } catch (error) {
    console.log({ error: error });
    res.status(404).send('Not found!');
  }
});
accommodationsRoute.delete('/:id', async (req, res) => {
  try {
    const deletedAcc = await AccModel.findByIdAndDelete(req.params.id);
    if (deletedAcc) {
      res.status(204).send('Accommodation Deleted!');
    } else {
      res.status(404).send('Not found!');
    }
  } catch (error) {
    console.log({ error: error });
    res.status(404).send('Not found!');
  }
});

export default accommodationsRoute;
