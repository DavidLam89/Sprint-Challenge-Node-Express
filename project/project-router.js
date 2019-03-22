const express = require('express');

const Project = require('./projectModel.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const project = await Project.get();
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving the project',
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await Project.get(req.params.id);

    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving the project',
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const project = await Project.insert(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({
      message: 'Error adding the project',
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const count = await Project.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'The project has been removed' });
    } else {
      res.status(404).json({ message: 'The project could not be found' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error removing the project',
    });
  }
});

router.put('/:id' , async (req, res) => {
  try {
    const project = await Project.update(req.params.id, req.body);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: 'The project could not be found' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error updating the project',
    });
  }
});

router.get('/:id/action', async (req, res) => {
  try {
    const action = await Project.getProjectActions(req.params.id);
    if (action.length > 0) {
      res.status(200).json(action);
    } else {
      res.status(404).json({ message: 'There are no action for this project' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error getting the actions for this project',
    });
  }
});

module.exports = router;
