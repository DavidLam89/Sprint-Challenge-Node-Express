const express = require('express');

const Action = require('./actionModel.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const action = await Action.get();
    res.status(200).json(action);
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving the action',
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const action = await Action.get(req.params.id);

    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json({ message: 'Action not found' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving the action',
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const action = await Action.insert(req.body);
    res.status(201).json(action);
  } catch (error) {
    res.status(500).json({
      message: 'Error adding the action',
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const count = await Action.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'The action has been deleted' });
    } else {
      res.status(404).json({ message: 'The action could not be found' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting the action',
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const action = await Action.update(req.params.id, req.body);
    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json({ message: 'The action could not be found' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error updating the action',
    });
  }
});

module.exports = router;
