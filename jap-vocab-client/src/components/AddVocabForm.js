import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddVocabForm = ({ onAdd, editingVocab, setEditingVocab, onUpdate }) => {
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [example, setExample] = useState('');

  useEffect(() => {
    if (editingVocab) {
      setWord(editingVocab.word);
      setMeaning(editingVocab.meaning);
      setExample(editingVocab.example);
    }
  }, [editingVocab]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newVocab = { word, meaning, example };
    if (editingVocab) {
      // Update existing vocab
      try {
        const res = await axios.put(`http://localhost:5000/api/vocab/${editingVocab._id}`, newVocab);
        onUpdate(res.data);  // Update the state with the updated vocab
        setEditingVocab(null);  // Reset the editing state after updating
      } catch (err) {
        console.error(err);
      }
    } else {
      // Add new vocab
      try {
        const res = await axios.post('http://localhost:5000/api/vocab', newVocab);
        onAdd(res.data);
      } catch (err) {
        console.error(err);
      }
    }

    setWord('');
    setMeaning('');
    setExample('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Word"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Meaning"
        value={meaning}
        onChange={(e) => setMeaning(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Example"
        value={example}
        onChange={(e) => setExample(e.target.value)}
        required
      />
      <button type="submit">{editingVocab ? 'Update' : 'Add'} Vocab</button>
    </form>
  );
};

export default AddVocabForm;
