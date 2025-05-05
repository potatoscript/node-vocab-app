const express = require('express');
const router = express.Router();
const Vocab = require('../models/Vocab');

// Get all vocab items
router.get('/', async (req, res) => {
  try {
    const vocabs = await Vocab.find();
    res.json(vocabs);
  } catch (err) {
    res.status(400).send('Error fetching vocab');
  }
});

// Add a new vocab
router.post('/', async (req, res) => {
  const { word, meaning, example } = req.body;
  const vocab = new Vocab({ word, meaning, example });
  try {
    const newVocab = await vocab.save();
    res.json(newVocab);
  } catch (err) {
    res.status(400).send('Error saving vocab');
  }
});

// Update a vocab
router.put('/:id', async (req, res) => {
  try {
    const updatedVocab = await Vocab.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedVocab);
  } catch (err) {
    res.status(400).send('Error updating vocab');
  }
});

// Delete a vocab
router.delete('/:id', async (req, res) => {
  try {
    await Vocab.findByIdAndDelete(req.params.id);
    res.status(200).send('Vocab deleted');
  } catch (err) {
    res.status(400).send('Error deleting vocab');
  }
});

module.exports = router;
